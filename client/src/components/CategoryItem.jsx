/* eslint-disable indent */
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    // flex: 1;
    display: flex;
    justfify-content: center;
    margin: 3px;
    height: 60vh;
    width: 30vw;
    position: relative;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-weight: 600;
`;

const CategoryItem = ({ item }) => {
    const navigate = useNavigate();
    const routeChange = () => {
        var path = `/`;
        switch (item.id) {
            case 1:
                path = "/shop/men";
                break;
            case 2:
                path = "/shop/women";
                break;
            case 3:
                path = "/shop/accessories";
                break;
        }
        navigate(path);
    };
    return (
        <Container>
            <Image src={item.img} />
            <Info>
                <Title>{item.title}</Title>
                <Button onClick={routeChange}>SHOP NOW</Button>
            </Info>
        </Container>
    );
};

export default CategoryItem;
