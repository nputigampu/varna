const { isLoggedIn } = require("../../middlewares/common");
const { getOrders, newOrder, newOrderItems, updateNoOfItems } = require("../../database/db");
const { Router } = require("express");
const router = Router();

// get orders for user
router.get("/api/orders/:otherUserId", isLoggedIn, async(req, res) => {

    const orders = await getOrders(req.session.userId);
    res.json({ orders });
});

// create new order
router.post("/api/orders", isLoggedIn, async(req, res) => {

    const { amount, house_no, street_name, city, pin } = req.body;
    const { items } = req.body.items;
    const no_of_items = items.length();

    const neworder = await newOrder(req.session.userId, amount, house_no, street_name, city, pin, no_of_items, "PROCESSING");
    await Promise.all(items.map(async(item) => {
        const result = await newOrderItems(neworder.id, item.productid, item.no_of_items, item.amount, item.size, item.color);
        const updResult = await updateNoOfItems(item.productid, item.no_of_items * -1);

    }));
    return res.json({
        neworder
    });

});

module.exports = router;