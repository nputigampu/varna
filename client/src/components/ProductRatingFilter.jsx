import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { addRatingFilter } from "../redux/filter/slice.js";
import { useDispatch, useSelector } from "react-redux";
import { getProductByFilter } from "../redux/product/slice.js";

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#d81b60",
    },
    "& .MuiRating-iconHover": {
        color: "#d81b60",
    },
});

export default function ProductRatingFilter() {
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();
    React.useEffect(() => {
        console.log("new value is:", value);
        dispatch(addRatingFilter(value));
        dispatch(getProductByFilter());
    }, [value]);
    return (
        <Box
            sx={{
                "& > legend": { mt: 2 },
            }}
        >
            <Typography
                component="legend"
                sx={{
                    mb: 1,
                }}
            >
                By Rating
            </Typography>
            <StyledRating
                max={5}
                value={value}
                onChange={async (event, newValue) => {
                    await setValue(newValue);
                }}
            />
        </Box>
    );
}
