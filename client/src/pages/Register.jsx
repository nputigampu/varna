import styled from "styled-components";
import SimpleReactValidator from "simple-react-validator";
import { mobile } from "../responsive";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/user/slice.js";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.5)
        ),
        url("https://images.pexels.com/photos/3865911/pexels-photo-3865911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
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
    // flex-direction: column;
    flex-wrap: wrap;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`;

const DivLink = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    let validator = new SimpleReactValidator({ locale: "de" });
    const checkPassword = () => {
        if (password == confirmPassword) {
            console.log("passwords match. ");
        } else {
            console.log("passwords does not match. try again");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("register new user", event);
        if (validator.allValid()) {
            // alert("All fields are valid");
            console.log("All fields are valid");
            fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    username: username,
                    password: password,
                }),
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log("result is: ", result);
                    if (result.newUser) {
                        dispatch(userLogin(result.newUser));
                        navigate("/");
                    } else {
                        console.log("error while registering user: ");
                    }
                })
                .catch((err) => {
                    // if something goes wrong => render an error
                    console.log("error while registering user: ", err);
                });
        } else {
            console.log("All fields are not valid");
            validator.showMessages();
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>Register for new account</Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {validator.message(
                        "First Name is invalid",
                        firstname,
                        "required|alpha_space|min:1|max:50"
                    )}
                    <Input
                        type="text"
                        placeholder="Last Name"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {validator.message(
                        "Last Name is invalid",
                        lastname,
                        "required|alpha_space|min:1|max:50"
                    )}
                    <Input
                        type="text"
                        placeholder="User Name"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    {validator.message(
                        "User Name is invalid",
                        username,
                        "alpha_num|min:1|max:50"
                    )}
                    <Input
                        type="email"
                        placeholder="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {validator.message("email", email, "required|email")}
                    <Input
                        type="password"
                        placeholder="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {validator.message(
                        "Invalid password. ",
                        password,
                        "required|alpha_num|min:6|max:20"
                    )}
                    <Input
                        type="password"
                        placeholder="confirm password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={checkPassword}
                    />
                    {validator.message(
                        "Please enter the same password again to confirm",
                        confirmPassword,
                        "required|alpha_num|min:6|max:20"
                    )}
                    <Agreement>
                        By signing up, I consent to the processing of my
                        personal data in accordance with the{" "}
                        <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button>REGISTER</Button>
                </Form>
                <DivLink>
                    <Link to="/login">
                        Have an account already ? Login here{" "}
                    </Link>
                </DivLink>
            </Wrapper>
        </Container>
    );
};

export default Register;
