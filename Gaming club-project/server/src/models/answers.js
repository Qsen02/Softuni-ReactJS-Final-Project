const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    }
})

const Answers = mongoose.model("Answers", answerSchema);

module.exports = {
    Answers
}