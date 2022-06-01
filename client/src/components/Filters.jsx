/* eslint-disable indent */
import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PriceFilter from "./PriceFilter";
import ProductRatingFilter from "./ProductRatingFilter";
import CategoryFilter from "./CategoryFilter";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
    resetCategoryFilter,
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
    const dispatch = useDispatch();
    const filter_params = useSelector((state) => state.filter.current_filter);

    useEffect(() => {
        dispatch(getProductByFilter());
    }, [filter_params]);

    const resetFilters = () => {
        dispatch(resetCategoryFilter(true));
        dispatch(addPricingFilter([0, 200]));
        dispatch(addRatingFilter(0));
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
