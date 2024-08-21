const mongoose = require("mongoose");

const userShcema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    orderHistory: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Orders",
        default: []
    }
})

const Users = mongoose.model("Users", userShcema);

module.exports = {
    Users
}