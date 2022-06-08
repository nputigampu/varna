/* eslint-disable indent */
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import LoginMessage from "../components/LoginMessage";
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

const LoginMessageWrapper = styled.div`
    margin-top: 50px;
    align-items: center;
    ${mobile({ marginRight: "0px" })}
`;

const Title = styled.h2`
    font-weight: 50;
    text-align: center;
`;

const CheckoutMessage = styled.h1`
    margin-top: 100px;
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
    width: 180px;
    height: 260px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

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
    font-size: 20px;
    font-weight: 100;
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
    height: 180px;
    width: 160px;
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [checkOut, setCheckOut] = useState(false);
    const cart = useSelector((state) => state.cart.cart);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        dispatch(getUserWishList());
        dispatch(loadCart());
    }, []);

    useEffect(() => {
        let sum = 0;
        if (cart) {
            cart.forEach((item) => {
                sum = sum + item.price_value * item.no_of_items;
            });
        }
        setTotal(sum);
    }, [cart]);

    useEffect(() => {}, [user]);

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
                    <Title>You do not have any items in your cart yet. </Title>
                    <ImageContainer>
                        <EmptyBag src={"../../icons/empty-bag.svg"}></EmptyBag>
                    </ImageContainer>
                    <Top>
                        <MiddleButton onClick={() => navigate("/")}>
                            SHOP NOW
                        </MiddleButton>
                    </Top>
                </Wrapper>
            )}
            <LoginMessageWrapper>
                {!user && !checkOut && <LoginMessage></LoginMessage>}
            </LoginMessageWrapper>
            {user && checkOut && (
                <Wrapper>
                    <CheckoutMessage>
                        Thank you for choosing Varna. Your order will be
                        processed soon.{" "}
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
