/* eslint-disable indent */
import styled from "styled-components";
import { mobile } from "../responsive";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 50vh;
    align-items: center;
    justify-contents: center;
    ${mobile({ marginRight: "0px" })}
`;

const ImageContainer = styled.div`
    height: 150px;
    width: 150px;
    margin: 30px auto 30px auto;
`;

const EmptyBag = styled.img`
    height: 100%;
`;

const LoginMessage = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Typography
                component="h3"
                sx={{
                    mb: 1.5,
                }}
            >
                Please login to see your profile, wishlist and cart
            </Typography>
            <ImageContainer>
                <EmptyBag src={"../../icons/empty-bag.svg"}></EmptyBag>
            </ImageContainer>
            <Button
                variant="outlined"
                sx={{
                    mb: 1.5,
                }}
                onClick={() => navigate("/login")}
            >
                LOGIN
            </Button>
        </Wrapper>
    );
};

export default LoginMessage;
