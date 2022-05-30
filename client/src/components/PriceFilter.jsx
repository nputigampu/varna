import React from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { addPricingFilter } from "../redux/filter/slice.js";
import { getProductByFilter } from "../redux/product/slice.js";

const MainWrapper = styled.div`
    width: "80%";
`;

export default function PriceFilter() {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState([0, 200]);
    const pricefrom = useSelector(
        (state) => state.filter.current_filter.pricefrom
    );
    const priceto = useSelector((state) => state.filter.current_filter.priceto);
    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        setValue([pricefrom, priceto]);
    }, [pricefrom, priceto]);

    React.useEffect(() => {
        dispatch(addPricingFilter(value));
        dispatch(getProductByFilter());
    }, [value]);

    const numFormatter = (newValue) => {
        return newValue + " €";
    };
    return (
        <MainWrapper>
            <Typography
                component="legend"
                sx={{
                    mb: 5.5,
                }}
            >
                By Price
            </Typography>
            <Slider
                value={value}
                max={200}
                step={5}
                onChange={handleChange}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                valueLabelFormat={(value) => <div>{numFormatter(value)}</div>}
                color="secondary"
                sx={{
                    width: "85%",
                }}
            />
        </MainWrapper>
    );
}
