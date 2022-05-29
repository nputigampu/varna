import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainCategories } from "../redux/homepage/slice.js";

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.homepage.maincategories);
    useEffect(() => {
        console.log("in use effect categories");
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
