const { isLoggedIn } = require("../../middlewares/common");
const { addProductToWishlist, removeProductFromWishList, getWishListForUser } = require("../../database/db");
const { Router } = require("express");
const router = Router();

router.get('/api/wishlist', isLoggedIn, async(req, res) => {
    console.log("get wish list");
    const wishlist = await getWishListForUser(req.session.userId);
    // console.log("wish list result:", wishlist);
    res.json(wishlist.rows);
});

router.post('/api/wishlist', isLoggedIn, async(req, res) => {
    console.log("add to wish list");
    const { productid } = req.body;
    const data = await addProductToWishlist(req.session.userId, productid);
    console.log("add to wish list, ", data);
    res.json(data.rows[0]);
});

router.delete('/api/wishlist', isLoggedIn, async(req, res) => {
    console.log("remove from wish list", req.session.userId);
    const { productid } = req.body;
    await removeProductFromWishList(req.session.userId, productid);
    res.json({ success: true });
});

module.exports = router;