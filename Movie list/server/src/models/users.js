const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    isAdmin: {
        type: Boolean,
        default: false
    },
    profileImage: {
        type: String,
        default: ""
    },
    likedMovies: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Movies",
        default: []
    },
    savedMovies: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Movies",
        default: []
    },
    createdMovies: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Movies",
        default: []
    }
})

const Users = mongoose.model("Users", userSchema);

module.exports = {
    Users
}