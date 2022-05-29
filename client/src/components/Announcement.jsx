import styled from "styled-components";

const Container = styled.div`
    height: 30px;
    background-color: #007c85;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`;

const Announcement = () => {
    return (
        <Container>
            Summer Offer! Free shipping on all orders. Hurry offer ends on 6th
            June.
        </Container>
    );
};

export default Announcement;
