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
import { updateSortBy, updatePage } from "../redux/filter/slice.js";
import PaginationControlled from "../components/Pagination";
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

const PaginationSortWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 3rem;
    ${mobile({ marginRight: "0px" })};
`;

const Products = () => {
    const filteredProducts = useSelector((state) => state.product.filtered);
    const totalCount = useSelector((state) => state.product.totalCount);
    const startPage = useSelector((state) => state.filter.page);

    const dispatch = useDispatch();
    const [sort, setSort] = useState("NEWEST");
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {}, [filteredProducts]);
    useEffect(() => {
        let count = totalCount ? Math.ceil(totalCount / 20) : 0;
        setCount(count);
    }, [totalCount]);

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        setCurrentPage(startPage);
    }, [startPage]);

    useEffect(() => {
        dispatch(updatePage(currentPage));
        dispatch(getProductByFilter());
    }, [currentPage]);

    useEffect(() => {
        dispatch(updateSortBy(sort));
    }, [sort]);

    return (
        <Container>
            <Announcement />
            <Navbar />
            <MainWrapper>
                <PaginationSortWrapper>
                    <PaginationControlled
                        count={count}
                        page={currentPage}
                        handleChange={handlePageChange}
                    ></PaginationControlled>
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
                                <MenuItem value={"POPULARITY"}>
                                    Popularity
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </SortContainer>
                </PaginationSortWrapper>
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
