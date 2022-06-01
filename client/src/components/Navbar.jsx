import { Badge } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Icon } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserWishList } from "../redux/wishlist/slice.js";
import { loadCart } from "../redux/cart/slice.js";
import { userLogin, userLogout, reset } from "../redux/user/slice.js";
import { addSearchFilter } from "../redux/filter/slice.js";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import Logout from "@mui/icons-material/Logout";

const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    height: 35px;
    width: 400px;
    box-sizing: border-box;
    margin: 0px 8px 7px 0px;
    padding: 7px 9px 0px 9px;
    border: 3px solid #d81b60;
    border-radius: 25px;
    transition: all 200ms ease;
    cursor: text;
`;

const Input = styled.input`
    border: none;
    width: 100%;
    box-sizing: border-box;
    font-family: Helvetica;
    font-size: 15px;
    color: inherit;
    background: transparent;
    outline-width: 0px;
    ${mobile({ width: "50px" })}
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;
const ImageContainer = styled.div`
    // height: 30px;
    cursor: pointer;
`;

const Logo = styled.h1`
    font-weight: bold;
    cursor: pointer;
    background-color: #e91e63;
    // font-family: ariel !important;
    /* Create the gradient. */
    // background-image: linear-gradient(45deg, #ff003d, #3d00eb);

    /* Set the background size and repeat properties. */
    background-size: 100%;
    background-repeat: repeat;

    /* Use the text as a mask for the background. */
    /* This will show the gradient as a text color rather than element bg. */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
    flex: 1;
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}
`;

const NavIconImg = styled.img`
    height: 27px;
    width: 27px;
    margin-top: 5px;
`;

const Navbar = () => {
    const shop = useLocation().pathname.split("/").pop();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParam, setSearchParam] = useState("");
    const user = useSelector((state) => state.user.user);
    const cartItems = useSelector((state) => state.cart.cart);
    const wishList = useSelector((state) => state.wishlist.wishlist);
    const filter_params = useSelector(
        (state) => state.filter.current_filter.searchParams
    );

    var noOfItemsInWishList = wishList ? wishList.length : 0;
    var noOfItemsInCart = cartItems ? cartItems.length : 0;
    //Account Menu

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        setSearchParam(filter_params);
        if (user) {
            dispatch(getUserWishList());
            dispatch(loadCart());
        } else {
            fetch("/api/user/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.user) {
                        dispatch(userLogin(result.user));
                        dispatch(getUserWishList());
                        dispatch(loadCart());
                    } else {
                        console.log("error while getting logged in user info");
                    }
                })
                .catch((err) => {
                    // if something goes wrong => render an error
                    console.log("error while getting logged in user info", err);
                });
        }
    }, []);
    useEffect(() => {
        dispatch(getUserWishList());
        dispatch(loadCart());
        noOfItemsInWishList = wishList ? wishList.length : 0;
        noOfItemsInCart = cartItems ? cartItems.length : 0;
    }, [user]);

    useEffect(() => {
        noOfItemsInCart = cartItems ? cartItems.length : 0;
    }, [cartItems]);

    useEffect(() => {
        noOfItemsInWishList = wishList ? wishList.length : 0;
    }, [wishList]);

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            if (event.target.value == "") {
                dispatch(addSearchFilter(""));
            } else {
                dispatch(addSearchFilter(event.target.value.toLowerCase()));
                if (
                    !(
                        shop === "men" ||
                        shop === "women" ||
                        shop === "accessories"
                    )
                ) {
                    navigate("/shop");
                }
            }
        }
    };
    const handleChange = (event) => {
        setSearchParam(event.target.value);
    };
    const handleLogout = () => {
        dispatch(userLogout());
        dispatch(reset());
        navigate("/");
        window.location.reload(true);
    };
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Logo onClick={() => navigate("/")}>VARNA</Logo>
                </Left>
                <Center>
                    <SearchContainer>
                        <Input
                            placeholder="Search"
                            onChange={handleChange}
                            value={searchParam}
                            onKeyUp={handleKeyUp}
                        />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Center>
                <Right>
                    <ImageContainer>
                        <NavIconImg
                            onClick={handleClick}
                            src={"../../icons/user.svg"}
                        ></NavIconImg>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    "& .MuiAvatar-root": {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    "&:before": {
                                        content: '""',
                                        display: "block",
                                        position: "absolute",
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: "background.paper",
                                        transform:
                                            "translateY(-50%) rotate(45deg)",
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{
                                horizontal: "right",
                                vertical: "top",
                            }}
                            anchorOrigin={{
                                horizontal: "right",
                                vertical: "bottom",
                            }}
                        >
                            {!user && (
                                <React.Fragment>
                                    <MenuItem
                                        onClick={() => navigate("/login")}
                                    >
                                        <LoginOutlinedIcon sx={{ mr: 2 }} />{" "}
                                        Login
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => navigate("/register")}
                                    >
                                        <PersonOutlinedIcon sx={{ mr: 1.5 }} />{" "}
                                        Register
                                    </MenuItem>
                                </React.Fragment>
                            )}
                            {user && (
                                <React.Fragment>
                                    <MenuItem
                                        onClick={() => navigate("/profile")}
                                    >
                                        <PersonOutlinedIcon sx={{ mr: 2 }} />{" "}
                                        Profile
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <Logout
                                                fontSize="small"
                                                sx={{ mr: 1.5 }}
                                            />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </React.Fragment>
                            )}
                        </Menu>
                    </ImageContainer>
                    <ImageContainer onClick={() => navigate("/wishlist")}>
                        <Badge
                            badgeContent={noOfItemsInWishList}
                            showZero={false}
                            color="primary"
                        >
                            <Icon>
                                <img
                                    src={"../../icons/wishlist.svg"}
                                    height={26}
                                    width={25}
                                />
                            </Icon>
                        </Badge>
                    </ImageContainer>
                    <ImageContainer onClick={() => navigate("/cart")}>
                        <Badge
                            badgeContent={noOfItemsInCart}
                            showZero={false}
                            color="primary"
                        >
                            <Icon>
                                <img
                                    src={"../../icons/bag.svg"}
                                    height={24}
                                    width={25}
                                />
                            </Icon>
                        </Badge>
                    </ImageContainer>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
