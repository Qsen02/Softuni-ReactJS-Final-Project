const { Router } = require("express");
const { ordering, cancelOrder, checkCartId, getCartById, addToCart, removeFromCart, findUserCart } = require("../services/cart");
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
    const basket = await getCartById(id).lean();
    res.json(basket);
})

cartRouter.put("/:cartId", isUser(), async(req, res) => {
    const id = req.params.cartId;
    const data = req.body;
    const newDishInBasket = await addToCart(id, data);
    res.json(newDishInBasket);
})

cartRouter.delete("/dishId/from/cartId", isUser(), async(req, res) => {
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
    res.status(200).json({ message: "Record remove from basket successfully" });
})

cartRouter.get("/:cartId", isUser(), async(req, res) => {
    const cartId = req.params.cartId;
    const isValid = await checkCartId(cartId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const dish = await getCartById(cartId).lean();
    res.json(dish);
})

cartRouter.post("/order/:cartId", isUser(), async(req, res) => {
    const id = req.params.cartId;
    const user = req.user;
    try {
        await ordering(id, user._id);
        res.status(200).json({ message: "Order was successfull!" });
    } catch (err) {
        res.status(400).json({ message: JSON.stringify(errorParser(err).errors) });
    }
})

cartRouter.post("/cancel/:cartId", isUser(), async(req, res) => {
    const id = req.params.cartId;
    await cancelOrder(id);
    res.status(200).json({ message: "Order was canceled successfully" });
})

module.exports = {
    cartRouter
}