/* eslint-disable indent */
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Product from "../components/Product";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import Filters from "../components/Filters";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addCategoryFilter,
    addRatingFilter,
    addPricingFilter,
} from "../redux/filter/slice.js";
import { getProductByFilter } from "../redux/product/slice.js";
// import { getPopularProducts } from "../redux/homepage/slice.js";

const Container = styled.div``;
const ProductContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
// const Title = styled.h1`
//     margin: 20px;
// `;

const SortContainer = styled.div`
    display: flex;
    justify-content: right;
`;

const Sort = styled.div`
    margin: 20px;
    ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const SortText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px" })}
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 0.3fr 1fr;
    ${mobile({ marginRight: "0px" })}
`;

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const Products = () => {
    const category = useLocation().pathname.split("/").pop();
    const dispatch = useDispatch();
    const filteredProducts = useSelector((state) => state.product.filtered);

    useEffect(() => {
        console.log("in use effect products first time ");
        console.log("in use effect filters : ", category);
        let prodcat = 0;
        switch (category) {
            case "men":
                prodcat = 1;
                break;
            case "women":
                prodcat = 2;
                break;
            case "accessories":
                prodcat = 3;
                break;
        }
        dispatch(addCategoryFilter(prodcat));
        dispatch(addPricingFilter([0, 200]));
        dispatch(addRatingFilter(0));
        dispatch(getProductByFilter());
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
                <SortContainer>
                    <Sort>
                        <SortText>Sort By</SortText>
                        <Select>
                            <Option selected>Newest</Option>
                            <Option>Price Lowest</Option>
                            <Option>Price Highest</Option>
                            <Option>Customer Rating</Option>
                            <Option>Popularity</Option>
                        </Select>
                    </Sort>
                </SortContainer>
                <Wrapper>
                    <Filters
                        category={category === "shop" ? "all" : category}
                    />
                    <ProductContainer>
                        {filteredProducts &&
                            filteredProducts.map((item) => (
                                <Product item={item} key={item.id} />
                            ))}
                    </ProductContainer>
                </Wrapper>
            </MainWrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Products;
