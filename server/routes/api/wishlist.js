const { isLoggedIn } = require("../../middlewares/common");
const { addProductToWishlist, removeProductFromWishList, getWishListForUser } = require("../../database/db");
const { Router } = require("express");
const router = Router();

router.get('/api/wishlist', isLoggedIn, async(req, res) => {
    const wishlist = await getWishListForUser(req.session.userId);
    res.json(wishlist.rows);
});

router.post('/api/wishlist', isLoggedIn, async(req, res) => {

    const { productid } = req.body;
    const data = await addProductToWishlist(req.session.userId, productid);
    res.json(data.rows[0]);
});

router.delete('/api/wishlist', isLoggedIn, async(req, res) => {
    const { productid } = req.body;
    await removeProductFromWishList(req.session.userId, productid);
    res.json({ success: true });
});

module.exports = router;