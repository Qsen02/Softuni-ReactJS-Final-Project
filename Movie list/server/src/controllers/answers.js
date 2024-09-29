const { Router } = require("express");
const { checkAnswerId, getAnswerById, createAnswer, deleteAnswer, editAnswer, likeAnswer, unlikeAnswer } = require("../services/answers");
const { checkCommentId, getCommentById } = require("../services/comments");

const answerRouter = Router();

answerRouter.get("/:answerId", async(req, res) => {
    const answerId = req.params.answerId;
    const isValid = await checkAnswerId(answerId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const answer = await getAnswerById(answerId).lean();
    res.json(answer);
})

answerRouter.post("/in/comment/:commentId", async(req, res) => {
    const commentId = req.params.commentId;
    const user = req.user;
    const fields = req.body;
    const isValid = await checkCommentId(commentId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await createAnswer(fields, user, commentId);
    const comment = await getCommentById(commentId).lean();
    res.json(comment);
})

answerRouter.delete("/:answerId/in/:commentId", async(req, res) => {
    const answerId = req.params.answerId;
    const isValidAnswer = await checkAnswerId(answerId);
    if (!isValidAnswer) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const commentId = req.params.commentId;
    const isValidComment = await checkCommentId(commentId);
    if (!isValidComment) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await deleteAnswer(answerId, commentId);
    res.json({ message: "Record deleted successfully!" });
})

answerRouter.put("/:answerId/in/:commentId", async(req, res) => {
    const answerId = req.params.answerId;
    const isValidAnswer = await checkAnswerId(answerId);
    const fields = req.body;
    if (!isValidAnswer) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const commentId = req.params.commentId;
    const isValidComment = await checkCommentId(commentId);
    if (!isValidComment) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await editAnswer(fields, answerId);
    res.status(200).json({ message: "Record edited successfully!" });
})

answerRouter.post("/:answerId/in/:commentId/like", async(req, res) => {
    const answerId = req.params.answerId;
    const isValidAnswer = await checkAnswerId(answerId);
    const user = req.user;
    if (!isValidAnswer) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const commentId = req.params.commentId;
    const isValidComment = await checkCommentId(commentId);
    if (!isValidComment) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await likeAnswer(user, answerId);
    const answer = await getAnswerById(answerId).lean();
    res.json(answer);
})

answerRouter.post("/:answerId/in/:commentId/unlike", async(req, res) => {
    const answerId = req.params.answerId;
    const isValidAnswer = await checkAnswerId(answerId);
    const user = req.user;
    if (!isValidAnswer) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const commentId = req.params.commentId;
    const isValidComment = await checkCommentId(commentId);
    if (!isValidComment) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await unlikeAnswer(user, answerId);
    const answer = await getAnswerById(answerId).lean();
    res.json(answer);
})

module.exports = {
    answerRouter
}