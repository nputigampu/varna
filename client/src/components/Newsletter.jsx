import { MailOutline } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
    background-color: #fcf5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const Title = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 20px;
`;

const Desc = styled.div`
    font-size: 1.2rem;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    margin-bottom: 20px;
    ${mobile({ width: "80%" })}
`;

const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
`;

const Button = styled.button`
    flex: 1;
    border: none;
    background-color: teal;
    color: white;
`;

const Newsletter = () => {
    return (
        <Container>
            <Title>News Letter</Title>
            <Desc>Get latest offers and updates.</Desc>
            <InputContainer>
                <Input placeholder="Your email" />
                <Button>
                    <MailOutline />
                </Button>
            </InputContainer>
        </Container>
    );
};

export default Newsletter;
