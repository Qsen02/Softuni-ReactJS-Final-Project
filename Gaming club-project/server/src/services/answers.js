const { Answers } = require("../models/answers");
const { Comments } = require("../models/comments");

async function getAllAnswers(commentId) {
    const comment = await Comments.findById(commentId).lean();
    return comment.answers;
}

async function createAnswer(commentId, data) {
    await Comments.findByIdAndUpdate(commentId, { $push: { answers: data } });
}

async function editAnswer(answerId, data) {
    await Answers.findByIdAndUpdate(answerId, { $set: data });
}

async function deleteAnswer(commentId, answerId) {
    await Comments.findByIdAndUpdate(commentId, { $pull: { answers: answerId } });
}

async function checkAnswerId(id) {
    let isValid = await Answers.findById(id);
    if (!isValid) {
        return false;
    }
    return true;
}

module.exports = {
    getAllAnswers,
    createAnswer,
    editAnswer,
    deleteAnswer,
    checkAnswerId
}