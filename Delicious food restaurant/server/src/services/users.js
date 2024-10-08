const bcrypt = require("bcrypt");
const { Users } = require("../models/users");
const { Dishes } = require("../models/dishes");

async function register(username, email, password, address) {
    const userUsername = await Users.findOne({ username: username }).lean();
    if (userUsername) {
        throw new Error("This username is already taken!");
    }
    const userEmail = await Users.findOne({ email: email }).lean();
    if (userEmail) {
        throw new Error("This email is already taken!");
    }
    const payload = {
        email: email,
        username: username,
        password: await bcrypt.hash(password, 10),
        address: address
    }
    const user = new Users(payload);
    await user.save();
    return user;
}

async function login(username, password) {
    const user = await Users.findOne({ username: username }).lean();
    if (!user) {
        throw new Error("Username or password dont't match");
    }
    const userPassword = await bcrypt.compare(password, user.password);
    if (!userPassword) {
        throw new Error("Username or password dont't match");
    }

    return user;
}

async function getUserById(userId) {
    const user = await Users.findById(userId).populate("orderHistory").lean();
    if (user.isAdmin) {
        const dishes = await Dishes.find({ ownerId: userId }).lean();
        user.createdDishes = dishes;
    }
    return user;
}

async function checkUserId(userId) {
    const users = await Users.find().lean();
    const isValid = users.find(el => el._id.toString() == userId);
    if (isValid) {
        return true;
    }
    return false;
}

module.exports = {
    register,
    login,
    getUserById,
    checkUserId
}