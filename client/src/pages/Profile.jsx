/* eslint-disable indent */
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import LoginMessage from "../components/LoginMessage";

const Container = styled.div``;

const LoginMessageWrapper = styled.div`
    margin-top: 50px;
    align-items: center;
    ${mobile({ marginRight: "0px" })}
`;

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    ${mobile({ marginRight: "0px" })}
`;

const Wrapper = styled.div`
    margin-top: 50px;
    margin-bottom: 20px;
    align-items: center;
    display: flex;
    justify-content: center;
    ${mobile({ marginRight: "0px" })}
`;

const Profile = () => {
    const user = useSelector((state) => state.user.user);

    useEffect(() => {}, [user]);

    return (
        <Container>
            <Announcement />
            <Navbar />
            <MainWrapper>
                {user && (
                    <Wrapper>
                        <Typography variant="h4" component="h3">
                            Welcome {user.firstname} {user.lastname}
                        </Typography>
                    </Wrapper>
                )}
                <LoginMessageWrapper>
                    {!user && <LoginMessage></LoginMessage>}
                </LoginMessageWrapper>
            </MainWrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Profile;
