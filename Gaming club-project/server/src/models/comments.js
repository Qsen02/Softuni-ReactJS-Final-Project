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
        type: [String],
        default: []
    },
    answers: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Answers",
        default: []
    }
});

let Comments = mongoose.model("Comments", commentSchema);

module.exports = {
    Comments
}