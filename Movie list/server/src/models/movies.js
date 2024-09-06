const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    },
    likes: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Users",
        default: []
    },
    saves: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Users",
        default: []
    },
    comments: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Comments",
        default: []
    }
})

const Movies = mongoose.model("Movies", movieSchema);

module.exports = {
    Movies
}