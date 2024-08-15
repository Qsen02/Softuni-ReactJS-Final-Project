const mongoose = require("mongoose");

const bascketSchema = new mongoose.Schema({
    dishes: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Dishes",
        default: []
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    },
})

const Carts = mongoose.model("Carts", bascketSchema);

module.exports = {
    Carts
}