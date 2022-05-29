const { isLoggedIn } = require("../../middlewares/common");
const { getCartItems, removeItemFromCart, addItemToCart, increaseItemsInCart, decreaseItemsInCart, emptyCard } = require("../../database/db");
const { Router } = require("express");
const router = Router();

router.get('/api/cart', isLoggedIn, async(req, res) => {
    console.log("get cart ");
    const cartitems = await getCartItems(req.session.userId);
    // console.log("in get cart list : ", cartitems);
    res.json(cartitems.rows);
});

router.post('/api/cart', isLoggedIn, async(req, res) => {
    console.log("add to cart");
    const { productid } = req.body;
    const data = await addItemToCart(req.session.userId, productid);
    console.log("add to cart list, ", data);
    res.json(data.rows[0]);
});

router.put('/api/cart/:id', isLoggedIn, async(req, res) => {
    const { no_of_items } = req.body;
    console.log("update  cart", req.params.id, no_of_items);
    var data;
    if (no_of_items > 0) {
        data = await increaseItemsInCart(req.session.userId, req.params.id, no_of_items);
    } else {
        data = await decreaseItemsInCart(req.session.userId, req.params.id, no_of_items);
    }
    console.log("update cart after, ", data);
    res.json({ success: true });
});

router.delete('/api/cart', isLoggedIn, async(req, res) => {
    const { productid } = req.body;
    console.log("remove from cart ", req.session.userId, productid);
    await removeItemFromCart(req.session.userId, productid);
    res.json({ success: true });
});

router.post('/api/cart/empty', isLoggedIn, async(req, res) => {
    console.log("empty from cart ", req.session.userId);
    await emptyCard(req.session.userId);
    res.json({ success: true });
});

module.exports = router;