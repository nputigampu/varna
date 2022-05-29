/* eslint-disable indent */
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Product from "../components/Product";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

// const Wrapper = styled.div`
//     padding: 20px;
//     ${mobile({ padding: "10px" })}
// `;

const Title = styled.h2`
    font-weight: 50;
    text-align: center;
`;

const ImageContainer = styled.div`
    height: 150px;
    width: 150px;
    margin: 30px auto 30px auto;
`;

const EmptyBag = styled.img`
    height: 100%;
`;

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
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

const Wishlist = () => {
    const wishList = useSelector((state) => state.wishlist.wishlist);
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("in use effect wishlist first time ");
    }, []);

    // useEffect(() => {
    //     console.log("in use effect products re-render: ", filteredProducts);
    // }, [filteredProducts]);
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
                    {!user && (
                        <Wrapper>
                            <Title>Please Login </Title>
                            <ImageContainer>
                                <EmptyBag
                                    src={"../../icons/empty-bag.svg"}
                                ></EmptyBag>
                            </ImageContainer>
                            <Top>
                                <MiddleButton
                                    onClick={() => navigate("/login")}
                                >
                                    LOGIN
                                </MiddleButton>
                            </Top>
                        </Wrapper>
                    )}
                </Wrapper>
            </MainWrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Wishlist;
