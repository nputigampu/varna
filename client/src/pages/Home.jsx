import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import PopularProducts from "../components/PopularProducts";
import Slider from "../components/Slider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWishList } from "../redux/wishlist/slice.js";
import { loadCart } from "../redux/cart/slice.js";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("in use effect home page");
        dispatch(getUserWishList());
        dispatch(loadCart());
    }, []);
    return (
        <div>
            <Announcement />
            <Navbar />
            <Slider />
            <Categories />
            <PopularProducts />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Home;
