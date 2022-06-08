import styled from "styled-components";
import Product from "./Product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularProducts } from "../redux/homepage/slice.js";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const PopularProducts = () => {
    const dispatch = useDispatch();
    const popularProducts = useSelector(
        (state) => state.homepage.popularProducts
    );

    useEffect(() => {
        dispatch(getPopularProducts());
    }, []);

    if (!popularProducts) {
        return null;
    }
    return (
        <Container>
            {popularProducts.map((item) => (
                <Product item={item} key={item.id} />
            ))}
        </Container>
    );
};

export default PopularProducts;
