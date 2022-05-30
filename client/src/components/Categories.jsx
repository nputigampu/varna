import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainCategories } from "../redux/homepage/slice.js";

const Container = styled.div`
    display: flex;
    padding: 20px;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.homepage.maincategories);
    useEffect(() => {
        dispatch(getMainCategories());
    }, []);
    if (!categories) {
        return null;
    }
    return (
        <Container>
            {categories.map((item) => (
                <CategoryItem item={item} key={item.id} />
            ))}
        </Container>
    );
};

export default Categories;
