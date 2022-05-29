/* eslint-disable indent */
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Container = styled.div``;

const LoginWrapper = styled.div`
    align-items: center;
    margin-top: 50px;
    ${mobile({ marginRight: "0px" })}
`;

const Title = styled.h2`
    font-weight: 50;
    text-align: center;
    margin-bottom: 30px;
`;

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    ${mobile({ marginRight: "0px" })}
`;

const Wrapper = styled.div`
    margin-top: 50px;
    align-items: center;
    ${mobile({ marginRight: "0px" })}
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const MiddleButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    margin: auto;
    border: ${(props) => props.type === "filled" && "none"};
    background-color: ${(props) =>
        props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};
`;

const Profile = () => {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("in use effect wishlist first time ");
    }, [user]);

    return (
        <Container>
            <Announcement />
            <Navbar />
            <MainWrapper>
                {user && (
                    <Wrapper>
                        <Typography variant="h3" component="h2">
                            Welcome {user.firstname} {user.lastname}
                        </Typography>
                    </Wrapper>
                )}
                {!user && (
                    <LoginWrapper>
                        <Title>
                            You are not logged in. Please login to see your
                            wishlist and cart{" "}
                        </Title>
                        <Top>
                            <MiddleButton onClick={() => navigate("/login")}>
                                LOGIN
                            </MiddleButton>
                        </Top>
                    </LoginWrapper>
                )}
            </MainWrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Profile;
