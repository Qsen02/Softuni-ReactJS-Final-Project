const { Answers } = require("../models/answers");
const { Comments } = require("../models/comments");

async function getAllAnswers(commentId) {
    const comment = await Comments.findById(commentId).populate("answers").lean();
    return comment.answers;
}

function getAnswerById(answerId) {
    const answer = Answers.findById(answerId);
    return answer;
}

async function createAnswer(commentId, data, user) {
    const answer = new Answers(data);
    answer.ownerId = user._id;
    await answer.save();
    await Comments.findByIdAndUpdate(commentId, { $push: { answers: answer } });
}

async function editAnswer(answerId, data) {
    await Answers.findByIdAndUpdate(answerId, { $set: data });
}

async function deleteAnswer(commentId, answerId) {
    await Answers.findByIdAndDelete(answerId);
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
    checkAnswerId,
    getAnswerById
}