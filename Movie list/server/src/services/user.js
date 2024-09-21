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
        throw new Error("Username or password don't match!");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Username or password don't match!");
    }
    return user;
}

function getUserById(id) {
    const user = Users.findById(id).populate("likedMovies").populate("savedMovies").populate("createdMovies");
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

async function editUser(userId, image, username, email) {
    await Users.findByIdAndUpdate(userId, {
        $set: {
            profileImage: image,
            username: username,
            email: email,
        }
    });
}

async function changePassword(newPassword, user) {
    const isEqual = await bcrypt.compare(newPassword, user.password);
    if (isEqual) {
        throw new Error("Old password can't be new password!");
    }
    await Users.findByIdAndUpdate(user._id.toString(), { $set: { password: await bcrypt.hash(newPassword, 10) } });
}

module.exports = {
    register,
    login,
    getUserById,
    checkUserId,
    editUser,
    changePassword
}