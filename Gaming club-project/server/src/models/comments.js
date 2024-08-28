let mongoose = require("mongoose");

let commentSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true,
    },
    gameId: {
        type: String,
        require: true
    },
    likes: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Users",
        default: []
    }
});

let Comments = mongoose.model("Comments", commentSchema);

module.exports = {
    Comments
}