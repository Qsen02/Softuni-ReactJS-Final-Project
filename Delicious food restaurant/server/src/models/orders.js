const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    dishes: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Dishes",
        default: []
    },
    totalPrice: {
        type: Number,
        require: true
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    },
})

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = {
    Orders
}