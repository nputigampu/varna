/* eslint-disable indent */
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Product from "../components/Product";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import LoginMessage from "../components/LoginMessage";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";

const Container = styled.div``;
const ProductContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Wrapper = styled.div`
    margin-top: 50px;
    align-items: center;
    ${mobile({ marginRight: "0px" })}
`;

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    ${mobile({ marginRight: "0px" })}
`;

const Wishlist = () => {
    const wishList = useSelector((state) => state.wishlist.wishlist);
    const user = useSelector((state) => state.user.user);

    return (
        <Container>
            <Announcement />
            <Navbar />
            {/* <Title>Dresses</Title> */}
            <MainWrapper>
                <Wrapper>
                    {user && (
                        <ProductContainer>
                            {wishList &&
                                wishList.map((item) => (
                                    <Product item={item} key={item.id} />
                                ))}
                        </ProductContainer>
                    )}
                    {!user && <LoginMessage></LoginMessage>}
                </Wrapper>
            </MainWrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Wishlist;
