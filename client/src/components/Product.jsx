/* eslint-disable indent */
import {
    FavoriteBorderOutlined,
    StarOutlined,
    ShoppingCartOutlined,
} from "@material-ui/icons";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newCartItem, updateCartItem } from "../redux/cart/slice.js";
import { newItem, removeItem } from "../redux/wishlist/slice.js";

const ProductRatingContainer = styled.div`
    height: 18px;
    margin-top: 10px;
    background-color: #ffffffcc;
    padding: 0 0 0 4px;
    border-radius: 2px;
    margin-left: 10px;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    z-index: 10;
    align-items: center;
`;

const ProductRatingCount = styled.div`
    padding-right: 4px;
    display: flex;
    margin-left: 4px;
`;

const Seperator = styled.div`
    font-size: 10px;
    margin: -0.5px 6px 0 -2px;
`;

const PricingContainer = styled.div`
    height: 18px;
    margin-top: 10px;
    background-color: #ffffffcc;
    padding: 0 0 0 4px;
    border-radius: 2px;
    margin-left: 10px;
    font-weight: 500;
    font-size: 18px;
    display: flex;
    // z-index: 10;
    align-items: center;
`;

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    box-sizing: border-box;
    min-width: 280px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;

    &:hover ${Info} {
        opacity: 1;
    }
`;

// const Circle = styled.div`
//     width: 200px;
//     height: 200px;
//     border-radius: 50%;
//     background-color: white;
//     position: absolute;
// `;
const ImageContainer = styled.div`
    height: 75%;
    display: flex;
    justify-content: center;
`;

const Image = styled.img`
    // height: 75%;
    z-index: 2;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;

const Product = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const wishlist = useSelector((state) => state.wishlist.wishlist);
    const cart = useSelector((state) => state.cart.cart);
    const handleClick = (parameter) => (event) => {
        console.log("console log: ", event);
        console.log("console log parameter: ", parameter);
        console.log("item id is : ", user);
        event.stopPropagation();
        if (user) {
            console.log("adding item to wish list in prod");
            switch (parameter) {
                case "wishlist":
                    var temp = wishlist.find(
                        (element) => element.productid == item.productid
                    );
                    if (temp) {
                        dispatch(removeItem(item.productid));
                    } else {
                        dispatch(newItem(item.productid));
                    }
                    break;
                case "cart":
                    var tempItem = cart.find(
                        (element) => element.productid == item.productid
                    );
                    if (tempItem) {
                        dispatch(updateCartItem(item.productid, 1));
                    } else {
                        dispatch(newCartItem(item.productid));
                    }
                    break;
                case "detail":
                    navigate("/shop/item/" + item.id + "/detail");
                    break;
            }
        } else {
            if (parameter == "detail") {
                navigate("/shop/item/" + item.id + "/detail");
            } else {
                console.log("cant add to wishlist. login first");
                // event.stopPropagation();
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        console.log("in use effect product first time render");
    }, []);

    return (
        <Container>
            {/* <Circle /> */}
            <ImageContainer>
                <Image src={item.image} onClick={handleClick("detail")} />
            </ImageContainer>
            <Info>
                <Icon>
                    <ShoppingCartOutlined onClick={handleClick("cart")} />
                </Icon>
                {wishlist.find(
                    (element) => element.productid == item.productid
                ) && (
                    <Icon>
                        <FavoriteOutlinedIcon
                            onClick={handleClick("wishlist")}
                            sx={{ color: "#d81b60" }}
                        />
                    </Icon>
                )}
                {!wishlist.find(
                    (element) => element.productid == item.productid
                ) && (
                    <Icon>
                        <FavoriteBorderOutlined
                            onClick={handleClick("wishlist")}
                            color="action"
                        />
                    </Icon>
                )}
            </Info>
            {item?.rating && (
                <ProductRatingContainer>
                    <span>{item.rating}</span>
                    <StarOutlined fontSize="small" htmlColor="#68D391" />
                    <ProductRatingCount>
                        <Seperator>|</Seperator>
                        {item.ratings_total}
                    </ProductRatingCount>
                </ProductRatingContainer>
            )}
            {item?.price_value && (
                <PricingContainer>
                    <span>{item.price_value} €</span>
                </PricingContainer>
            )}
        </Container>
    );
};

export default Product;
