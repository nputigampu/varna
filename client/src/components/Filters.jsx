/* eslint-disable indent */
import styled from "styled-components";
import { mobile } from "../responsive";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductFilters } from "../redux/filter/slice.js";
import PriceFilter from "./PriceFilter";
import ProductRatingFilter from "./ProductRatingFilter";
import CategoryFilter from "./CategoryFilter";

const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 20px;
    margin-right: 20px;
    // justify-content: space-between;
`;

const FilterText = styled.span`
    font-size: 18px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px" })}
`;

const Filters = ({ category }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("in use effect filters : ", category);
        dispatch(getProductFilters(category));
    }, []);

    return (
        <FilterContainer>
            <FilterText>Select Products</FilterText>
            <CategoryFilter category={category}></CategoryFilter>
            <PriceFilter />
            <ProductRatingFilter></ProductRatingFilter>
        </FilterContainer>
    );
};

export default Filters;
