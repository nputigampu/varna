import styled from "styled-components";
import Typography from "@mui/material/Typography";

const Container = styled.div`
    height: 30px;
    background-color: #56c29c;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
`;

const Announcement = () => {
    return (
        <Container>
            <Typography variant="h6">
                Summer Offer! Free shipping on all orders. Hurry offer ends on
                5th June.
            </Typography>
        </Container>
    );
};

export default Announcement;
