const { Answers } = require("../models/answer");
const { Comments } = require("../models/comments");

function getAnswerById(answerId) {
    const answer = Answers.findById(answerId).populate("ownerId").populate("likes");
    return answer;
}

async function createAnswer(data, user, commentId) {
    const newAnswer = new Answers(data);
    newAnswer.ownerId = user._id;
    newAnswer.save();
    await Comments.findByIdAndUpdate(commentId, { $push: { answers: newAnswer._id } });
}

async function deleteAnswer(answerId, commentId) {
    await Answers.findByIdAndDelete(answerId);
    await Comments.findByIdAndUpdate(commentId, { $pull: { answers: answerId } });
}

async function editAnswer(data, answerId) {
    await Answers.findByIdAndUpdate(answerId, { $set: data });
}

async function likeAnswer(user, answerId) {
    await Answers.findByIdAndUpdate(answerId, { $push: { likes: user._id } });
}

async function unlikeAnswer(user, answerId) {
    await Answers.findByIdAndUpdate(answerId, { $pull: { likes: user._id } });
}

async function checkAnswerId(answerId) {
    const answers = await Answers.find().lean();
    const isValid = answers.find(el => el._id.toString() == answerId);
    if (isValid) {
        return true;
    }
    return false;
}

module.exports = {
    getAnswerById,
    createAnswer,
    deleteAnswer,
    editAnswer,
    checkAnswerId,
    likeAnswer,
    unlikeAnswer
}