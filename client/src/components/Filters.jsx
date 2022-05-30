/* eslint-disable indent */
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import PriceFilter from "./PriceFilter";
import ProductRatingFilter from "./ProductRatingFilter";
import CategoryFilter from "./CategoryFilter";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
    getProductFilters,
    addCategoryFilter,
    addRatingFilter,
    addPricingFilter,
} from "../redux/filter/slice.js";
import { getProductByFilter } from "../redux/product/slice.js";

const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 20px;
    margin-right: 20px;
`;

const Filters = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const filter_params = useSelector((state) => state.filter.current_filter);
    const [prodCat, setProdCat] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        let shop = location.pathname.split("/").pop();
        let category = shop === "shop" ? "all" : shop;
        setCategory(category);
        let prodCat = "0";
        switch (category) {
            case "men":
                prodCat = "1";
                break;
            case "women":
                prodCat = "2";
                break;
            case "accessories":
                prodCat = "3";
                break;
        }
        setProdCat(prodCat);
        dispatch(getProductByFilter());
    }, []);
    useEffect(() => {
        dispatch(getProductByFilter());
    }, [filter_params]);

    const resetFilters = () => {
        dispatch(getProductFilters(category));
        dispatch(addCategoryFilter(prodCat));
        dispatch(addPricingFilter([0, 200]));
        dispatch(addRatingFilter(0));
        dispatch(getProductByFilter());
    };
    return (
        <FilterContainer>
            <Stack spacing={3} direction="row">
                <Button
                    variant="outlined"
                    sx={{
                        mb: 1.5,
                    }}
                    onClick={resetFilters}
                >
                    Clear
                </Button>
            </Stack>
            <CategoryFilter></CategoryFilter>
            <PriceFilter />
            <ProductRatingFilter></ProductRatingFilter>
        </FilterContainer>
    );
};

export default Filters;
