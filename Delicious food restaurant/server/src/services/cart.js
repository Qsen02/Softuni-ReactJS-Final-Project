const { Carts } = require("../models/cart");
const { Users } = require("../models/users");

async function createCart(user) {
    const newBasket = new Carts();
    newBasket.ownerId = user._id;
    await newBasket.save();
    return newBasket;
}

async function addToCart(basketId, data) {
    await Carts.findByIdAndUpdate(basketId, { $push: { dishes: data } });
}

async function removeFromCart(basketId, dish) {
    await Carts.findByIdAndUpdate(basketId, { $pull: { dishes: dish } });
}

async function cancelOrder(id) {
    await Carts.findByIdAndDelete(id);
}

function getCartById(id) {
    const dish = Carts.findById(id);
    return dish;
}

async function ordering(basketId, userId) {
    const basket = await Carts.findById(basketId).lean();
    if (basket.dishes.length == 0) {
        throw new Error("Basket is empty!");
    }
    await Users.findByIdAndUpdate(userId, { $push: { orderHistory: basket.dishes } });
    await Carts.findByIdAndUpdate(basketId, { $set: { dishes: [] } });
}

async function checkCartId(id) {
    const dishes = await Carts.find().lean();
    const isValid = dishes.find(el => el._id.toString() == id);
    if (isValid) {
        return true;
    }
    return false;
}

async function removeCart(user) {
    const basket = await Carts.findOne({ ownerId: user._id }).lean();
    if (basket) {
        await Carts.findByIdAndDelete(basket._id);
    }
}

function findUserCart(user) {
    const cart = Carts.findOne({ ownerId: user._id }).populate("dishes");
    return cart;
}

module.exports = {
    cancelOrder,
    checkCartId,
    addToCart,
    createCart,
    getCartById,
    removeFromCart,
    ordering,
    removeCart,
    findUserCart
}