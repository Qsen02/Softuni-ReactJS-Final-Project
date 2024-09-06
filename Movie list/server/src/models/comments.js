const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true,
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    },
    movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Movies"
    },
    likes: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Users",
        default: []
    }
})

const Comments = mongoose.model("Comments", commentSchema);

module.exports = {
    Comments
}