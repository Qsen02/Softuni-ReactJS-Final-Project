const { Router } = require("express");
const { checkCommentId, getCommentById } = require("../services/comments");
const { getAllAnswers, createAnswer, checkAnswerId, editAnswer, getAnswerById, deleteAnswer } = require("../services/answers");

const answerRouter = Router();

answerRouter.get("/comment/:commentId", async(req, res) => {
    const commentId = req.params.commentId;
    const isValid = await checkCommentId(commentId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const answers = await getAllAnswers(commentId);
    res.json(answers);
})

answerRouter.post("/comment/:commentId", async(req, res) => {
    const commentId = req.params.commentId;
    const answer = req.body;
    const user = req.user;
    const isValid = await checkCommentId(commentId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await createAnswer(commentId, answer, user);
    const comment = await getCommentById(commentId).lean();
    res.json(comment.answers);
})

answerRouter.get("/:answerId", async(req, res) => {
    const answerId = req.params.answerId;
    const isValid = await checkAnswerId(answerId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const answer = await getAnswerById(answerId).lean();
    res.json(answer);
})

answerRouter.put("/:answerId", async(req, res) => {
    const answerId = req.params.answerId;
    const data = req.body;
    const isValid = await checkAnswerId(answerId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await editAnswer(answerId, data);
    const answer = await getAnswerById(answerId).lean();
    res.json(answer);
})

answerRouter.delete("/:answerId/from/:commentId", async(req, res) => {
    const commentId = req.params.commentId;
    const isValidComment = await checkCommentId(commentId);
    if (!isValidComment) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const answerId = req.params.answerId;
    const isValidAnswer = await checkAnswerId(answerId);
    if (!isValidAnswer) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await deleteAnswer(commentId, answerId);
    const answers = await getAllAnswers(commentId);
    res.json(answers);
})

module.exports = {
    answerRouter
}