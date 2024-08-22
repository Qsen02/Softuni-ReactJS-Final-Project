const { Router } = require("express");
const { ordering, cancelOrder, checkCartId, getCartById, addToCart, removeFromCart, findUserCart, checkOrderId, getOrderById } = require("../services/cart");
const { isUser } = require("../middlewares/guard");
const { checkDishId } = require("../services/dishes");

const cartRouter = Router();

cartRouter.get("/find", isUser(), async(req, res) => {
    const user = req.user;
    const cart = await findUserCart(user).lean();
    res.json(cart);
})

cartRouter.get("/:cartId", isUser(), async(req, res) => {
    const id = req.params.cartId;
    const isValid = await checkCartId(id);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const cart = await getCartById(id).lean();
    res.json(cart);
})

cartRouter.put("/:cartId", isUser(), async(req, res) => {
    const id = req.params.cartId;
    const data = req.body;
    await addToCart(id, data);
    res.status(200).json({ message: "Dish added succesfully" });
})

cartRouter.delete("/remove/:dishId/from/:cartId", isUser(), async(req, res) => {
    const dishId = req.params.dishId;
    const basketId = req.params.cartId;
    const isBasketValid = await checkCartId(basketId);
    if (!isBasketValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const isDishValid = await checkDishId(dishId);
    if (!isDishValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await removeFromCart(basketId, dishId);
    const cart = await getCartById(basketId).lean();
    res.status(200).json(cart.dishes);
})

cartRouter.post("/order/:cartId", isUser(), async(req, res) => {
    const id = req.params.cartId;
    const user = req.user;
    try {
        await ordering(id, user);
        res.status(200).json({ message: "Order was successfull!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

cartRouter.post("/cancel/:cartId", isUser(), async(req, res) => {
    const id = req.params.cartId;
    await cancelOrder(id);
    const cart = await getCartById(id).lean();
    res.status(200).json(cart.dishes);
})

cartRouter.get("/order/:orderId", async(req, res) => {
    const orderId = req.params.orderId;
    const isValid = await checkOrderId(orderId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const order = await getOrderById(orderId).lean();
    res.json(order);
})

module.exports = {
    cartRouter
}