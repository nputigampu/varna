const { isLoggedIn } = require("../../middlewares/common");
const { getCartItems, removeItemFromCart, addItemToCart, increaseItemsInCart, decreaseItemsInCart, emptyCard } = require("../../database/db");
const { Router } = require("express");
const router = Router();

router.get('/api/cart', isLoggedIn, async(req, res) => {

    const cartitems = await getCartItems(req.session.userId);
    // 
    res.json(cartitems.rows);
});

router.post('/api/cart', isLoggedIn, async(req, res) => {

    const { productid } = req.body;
    const data = await addItemToCart(req.session.userId, productid);

    res.json(data.rows[0]);
});

router.put('/api/cart/:id', isLoggedIn, async(req, res) => {
    const { no_of_items } = req.body;

    var data;
    if (no_of_items > 0) {
        data = await increaseItemsInCart(req.session.userId, req.params.id, no_of_items);
    } else {
        data = await decreaseItemsInCart(req.session.userId, req.params.id, no_of_items);
    }

    res.json({ success: true });
});

router.delete('/api/cart', isLoggedIn, async(req, res) => {
    const { productid } = req.body;

    await removeItemFromCart(req.session.userId, productid);
    res.json({ success: true });
});

router.post('/api/cart/empty', isLoggedIn, async(req, res) => {

    await emptyCard(req.session.userId);
    res.json({ success: true });
});

module.exports = router;