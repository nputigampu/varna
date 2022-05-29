import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#d81b60",
        },
        secondary: {
            main: "#4cabb5",
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home />} />{" "}
                    <Route
                        exact
                        path="/shop/item/:id/detail"
                        element={<ProductDetail />}
                    />{" "}
                    <Route exact path="/shop/men" element={<Products />} />{" "}
                    <Route exact path="/shop/women" element={<Products />} />{" "}
                    <Route
                        exact
                        path="/shop/accessories"
                        element={<Products />}
                    />{" "}
                    <Route exact path="/shop" element={<Products />} />{" "}
                    <Route exact path="/register" element={<Register />} />{" "}
                    <Route exact path="/login" element={<Login />} />{" "}
                    <Route exact path="/wishlist" element={<Wishlist />} />{" "}
                    <Route exact path="/profile" element={<Profile />} />{" "}
                    <Route exact path="/cart" element={<Cart />} />{" "}
                    <Route path="*" element={<Home />} />{" "}
                </Routes>{" "}
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
