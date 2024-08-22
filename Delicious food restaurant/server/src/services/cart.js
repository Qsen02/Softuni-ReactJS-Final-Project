const { Carts } = require("../models/cart");
const { Orders } = require("../models/orders");
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
    await Carts.findByIdAndUpdate(id, { dishes: [] });
}

function getCartById(id) {
    const dish = Carts.findById(id).populate("dishes");
    return dish;
}

async function ordering(basketId, user) {
    const basket = await Carts.findById(basketId).populate("dishes").lean();
    if (basket.dishes.length == 0) {
        throw new Error("Basket is empty!");
    }
    const newOrder = new Orders({
        dishes: basket.dishes,
        ownerId: user._id,
        totalPrice: basket.dishes.map(el => el.price).reduce((acc, val) => acc + val)
    })
    await newOrder.save();
    const order = await Orders.findById(newOrder._id.toString()).lean();
    await Users.findByIdAndUpdate(user._id.toString(), { $push: { orderHistory: order } });
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

function getOrderById(orderId) {
    const order = Orders.findById(orderId).populate("dishes");
    return order;
}

async function checkOrderId(orderId) {
    const orders = await Orders.find().lean();
    const isValid = orders.find(el => el._id.toString() == orderId);
    if (isValid) {
        return true;
    }
    return false;
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
    findUserCart,
    checkOrderId,
    getOrderById
}