const bcrypt = require("bcrypt");
const { Users } = require("../models/users");

async function register(username, email, password) {
    const userUsername = await Users.findOne({ username }).lean();
    if (userUsername) {
        throw new Error("This username already exist!");
    }
    const userEmail = await Users.findOne({ email }).lean();
    if (userEmail) {
        throw new Error("This email already exist!");
    }
    const newUser = new Users({
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10),
    })
    newUser.save();
    return newUser;
}

async function login(username, password) {
    const user = await Users.findOne({ username }).lean();
    if (!user) {
        throw new Error("Username or password dont't match!");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Username or password dont't match!");
    }
    return user;
}

function getUserById(id) {
    const user = Users.findById(id);
    return user;
}

async function checkUserId(id) {
    const users = await Users.find().lean();
    const isValid = users.find(el => el._id.toString() == id);
    if (!isValid) {
        return false;
    }
    return true;
}

module.exports = {
    register,
    login,
    getUserById,
    checkUserId
}