import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/user/slice.js";
import SimpleReactValidator from "simple-react-validator";
import { getUserWishList } from "../redux/wishlist/slice.js";
import { loadCart } from "../redux/cart/slice.js";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.5)
        ),
        url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
`;

const DivLink = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let validator = new SimpleReactValidator({ locale: "de" });

    const loginUser = (event) => {
        event.preventDefault();

        if (validator.allValid()) {
            // alert("All fields are valid");

            fetch("/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.user) {
                        dispatch(userLogin(result.user));
                        dispatch(getUserWishList());
                        dispatch(loadCart());
                        navigate("/");
                    } else {
                    }
                })
                .catch((err) => {
                    // if something goes wrong => render an error
                });
        } else {
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form onSubmit={loginUser}>
                    <Input
                        type="email"
                        placeholder="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => validator.showMessageFor("email")}
                    />
                    {validator.message("email", email, "required|email")}
                    <Input
                        type="password"
                        placeholder="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => validator.showMessageFor("password")}
                    />
                    {validator.message(
                        "Invalid password. ",
                        password,
                        "required|alpha_num|min:6|max:20"
                    )}
                    <Button>LOGIN</Button>
                    <DivLink>
                        <Link to="/register">
                            {" "}
                            Don&apos;t have an account ? Register here{" "}
                        </Link>
                    </DivLink>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;
