import React from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { addPricingFilter } from "../redux/filter/slice.js";
import { getProductByFilter } from "../redux/product/slice.js";

const MainWrapper = styled.div`
    width: "80%";
`;

export default function PriceFilter() {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState([0, 500]);

    const handleChange = (e, newValue) => {
        // console.log(e.target);
        setValue(newValue);
    };
    React.useEffect(() => {
        console.log("new value is:", value);
        dispatch(addPricingFilter(value));
        dispatch(getProductByFilter());
    }, [value]);
    const numFormatter = (newValue) => {
        // console.log(e.target);
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
                // min={-100}
                max={200}
                step={5}
                onChange={handleChange}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                // aria-valuetext=""
                valueLabelFormat={(value) => <div>{numFormatter(value)}</div>}
                color="secondary"
                sx={{
                    width: "85%",
                }}
                // getAriaValueText={valuetext}
            />
        </MainWrapper>
    );
}
