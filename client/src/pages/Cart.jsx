/* eslint-disable indent */
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishList } from "../redux/wishlist/slice.js";
import {
    loadCart,
    newCartItem,
    removeCartItem,
    updateCartItem,
    emptyCart,
} from "../redux/cart/slice.js";

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h2`
    font-weight: 50;
    text-align: center;
`;

const CheckoutMessage = styled.h1`
    margin-top: 200px;
    margin-bottom: 20px;
    font-weight: 200;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.type === "filled" && "none"};
    background-color: ${(props) =>
        props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};
`;

const MiddleButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    margin: auto;
    border: ${(props) => props.type === "filled" && "none"};
    background-color: ${(props) =>
        props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};
`;

// const TopTexts = styled.div`
//     ${mobile({ display: "none" })}
// `;
// const TopText = styled.span`
//     text-decoration: underline;
//     cursor: pointer;
//     margin: 0px 10px;
// `;

const Bottom = styled.div`
    // display: flex;
    // justify-content: space-between;
    // ${mobile({ flexDirection: "column" })}
    display: grid;
    grid-template-columns: 0.7fr 0.3fr;
    ${mobile({ marginRight: "0px" })}
`;

const Info = styled.div`
    flex: 3;
    height: 80px;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 150px;
    height: 150px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const ImageContainer = styled.div`
    height: 150px;
    width: 150px;
    margin: 30px auto 0 auto;
`;

const EmptyBag = styled.img`
    height: 100%;
`;

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`;
const CartItemContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-between;
`;

const Cart = () => {
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [checkOut, setCheckOut] = useState(false);
    // const wishlist = useSelector((state) => state.wishlist.wishlist);
    const cart = useSelector((state) => state.cart.cart);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        console.log("in use effect cart page");
        dispatch(getUserWishList());
        dispatch(loadCart());
    }, []);

    useEffect(() => {
        console.log("in use effect cart page");
        let sum = 0;
        if (cart) {
            cart.forEach((item) => {
                sum = sum + item.price_value * item.no_of_items;
            });
        }
        setTotal(sum);
    }, [cart]);

    useEffect(() => {
        console.log("in use effect cart page");
    }, [user]);

    const onCheckOut = () => {
        dispatch(emptyCart());
        setCheckOut(true);
    };
    const handleClick = (increment, item) => () => {
        let updNoOfItems = item.no_of_items + increment;
        if (item.no_of_items == 0 && increment == 1) {
            dispatch(newCartItem(item.productid));
        } else if (updNoOfItems <= 0) {
            dispatch(removeCartItem(item.productid));
        } else {
            dispatch(updateCartItem(item.productid, increment));
        }
    };
    // if (!user) {
    //     return (
    //         <Container>
    //             <Announcement />
    //             <Navbar />
    //             <Wrapper>
    //                 <Title>Please Login First</Title>
    //                 <ImageContainer>
    //                     <EmptyBag src={"../../icons/empty-bag.svg"}></EmptyBag>
    //                 </ImageContainer>
    //                 <Top>
    //                     <MiddleButton onClick={() => navigate("/login")}>
    //                         LOGIN
    //                     </MiddleButton>
    //                 </Top>
    //             </Wrapper>
    //             <Newsletter />
    //             <Footer />
    //         </Container>
    //     );
    // }
    return (
        <Container>
            <Announcement />
            <Navbar />
            {user && cart && cart.length > 0 && !checkOut && (
                <Wrapper>
                    <Title>Your Shopping Bag</Title>
                    <Top>
                        <TopButton onClick={() => navigate("/")}>
                            CONTINUE SHOPPING
                        </TopButton>
                        {/* <TopTexts>
                            <TopText>
                                Shopping Bag({cart && cart.length})
                            </TopText>
                            <TopText>
                                Your Wishlist ({wishlist && wishlist.length})
                            </TopText>
                        </TopTexts> */}
                        <TopButton type="filled" onClick={onCheckOut}>
                            CHECKOUT NOW
                        </TopButton>
                    </Top>
                    <Bottom>
                        <CartItemContainer>
                            {cart.map((item) => (
                                <Info key={item.id}>
                                    <Product>
                                        <ProductDetail>
                                            <Image src={item.image} />
                                            <Details>
                                                <ProductName>
                                                    {item.title}
                                                </ProductName>
                                                <ProductId>
                                                    <b>ID:</b> {item.productid}
                                                </ProductId>
                                                <ProductColor
                                                    // color={item.item_color}
                                                    color={
                                                        item.color[
                                                            getRandomInt(
                                                                item.color
                                                                    .length
                                                            )
                                                        ]
                                                    }
                                                />
                                                <ProductSize>
                                                    <b>Size:</b>{" "}
                                                    {
                                                        item.sizes[
                                                            getRandomInt(
                                                                item.sizes
                                                                    .length
                                                            )
                                                        ]
                                                    }
                                                </ProductSize>
                                            </Details>
                                        </ProductDetail>
                                        <PriceDetail>
                                            <ProductAmountContainer>
                                                <Add
                                                    onClick={handleClick(
                                                        1,
                                                        item
                                                    )}
                                                />
                                                <ProductAmount>
                                                    {item.no_of_items}
                                                </ProductAmount>
                                                <Remove
                                                    color={
                                                        item.no_of_items > 0
                                                            ? "action"
                                                            : "disabled"
                                                    }
                                                    onClick={handleClick(
                                                        -1,
                                                        item
                                                    )}
                                                />
                                            </ProductAmountContainer>
                                            <ProductPrice>
                                                €{" "}
                                                {Math.round(
                                                    item.price_value *
                                                        item.no_of_items
                                                )}
                                            </ProductPrice>
                                        </PriceDetail>
                                    </Product>
                                    <Hr />
                                </Info>
                            ))}
                        </CartItemContainer>
                        <Summary>
                            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Subtotal</SummaryItemText>
                                <SummaryItemPrice>
                                    € {Math.round(total)}
                                </SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>
                                    Estimated Shipping
                                </SummaryItemText>
                                <SummaryItemPrice>€ 5.90</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>
                                    Shipping Discount
                                </SummaryItemText>
                                <SummaryItemPrice>€ -5.90</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice>
                                    € {Math.round(total)}
                                </SummaryItemPrice>
                            </SummaryItem>
                            <Button onClick={onCheckOut}>CHECKOUT NOW</Button>
                        </Summary>
                    </Bottom>
                </Wrapper>
            )}
            {(!cart || cart.length == 0) && user && !checkOut && (
                <Wrapper>
                    <Title>Your bag is Empty</Title>
                    <ImageContainer>
                        <EmptyBag src={"../../icons/empty-bag.svg"}></EmptyBag>
                    </ImageContainer>
                    <Top>
                        <MiddleButton onClick={() => navigate("/products")}>
                            SHOP NOW
                        </MiddleButton>
                    </Top>
                </Wrapper>
            )}
            {!user && !checkOut && (
                <Wrapper>
                    <Title>Please Login </Title>
                    <ImageContainer>
                        <EmptyBag src={"../../icons/empty-bag.svg"}></EmptyBag>
                    </ImageContainer>
                    <Top>
                        <MiddleButton onClick={() => navigate("/login")}>
                            LOGIN
                        </MiddleButton>
                    </Top>
                </Wrapper>
            )}
            {user && checkOut && (
                <Wrapper>
                    <CheckoutMessage>
                        Thank you for choosing Varna. Your order is in process.
                        Please continue to shop{" "}
                    </CheckoutMessage>
                    <Top>
                        <MiddleButton
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            SHOP
                        </MiddleButton>
                    </Top>
                </Wrapper>
            )}
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Cart;
