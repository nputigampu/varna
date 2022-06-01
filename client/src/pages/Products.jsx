/* eslint-disable indent */
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Product from "../components/Product";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import Filters from "../components/Filters";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { updateSortBy } from "../redux/filter/slice.js";
import { getProductByFilter } from "../redux/product/slice.js";

const Container = styled.div``;
const ProductContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const SortContainer = styled.div`
    display: flex;
    justify-content: right;
    margin-right: 10px;
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

const Products = () => {
    const filteredProducts = useSelector((state) => state.product.filtered);
    const dispatch = useDispatch();
    const [sort, setSort] = useState("NEWEST");

    useEffect(() => {}, [filteredProducts]);

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    useEffect(() => {
        dispatch(updateSortBy(sort));
        dispatch(getProductByFilter());
    }, [sort]);

    return (
        <Container>
            <Announcement />
            <Navbar />
            <MainWrapper>
                <SortContainer>
                    <FormControl
                        size="medium"
                        sx={{
                            width: 200,
                        }}
                    >
                        <InputLabel id="demo-simple-select-label">
                            Sort By
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sort}
                            label="Sort By"
                            onChange={handleChange}
                        >
                            <MenuItem value={"NEWEST"}>Newest</MenuItem>
                            <MenuItem value={"PRICE_LOW"}>
                                Price Lowest
                            </MenuItem>
                            <MenuItem value={"PRICE_HIGH"}>
                                Price Highest
                            </MenuItem>
                            <MenuItem value={"RATING"}>
                                Customer Rating
                            </MenuItem>
                            <MenuItem value={"POPULARITY"}>Popularity</MenuItem>
                        </Select>
                    </FormControl>
                </SortContainer>
                <Wrapper>
                    <Filters />
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
