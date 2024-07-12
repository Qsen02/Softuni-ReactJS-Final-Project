const { Router } = require("express");
const { checkCommentId, deleteComment, getCommentById, addComment, editComment } = require("../services/comments");
const { isUser } = require("../middlewears/guards");
const { checkGameId } = require("../services/games");
const { body, validationResult } = require("express-validator");
const { errorParser } = require("../util");

let commentRouter = Router();

commentRouter.post("/games/:id",
    isUser(),
    body("content").isLength({ min: 3 }).withMessage("Comment must be at least 3 symbols long!"),
    async(req, res) => {
        let user = req.user;
        let id = req.params.id;
        let isValid = await checkGameId(id);
        if (!isValid) {
            res.status(404).json({ message: "Page not found!" });
            return;
        }
        let content = req.body.content;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await addComment(user.username, content, id);
            res.status(200).json("Record created succesfully!");
        } catch (err) {
            res.status(400).json({ message: errorParser(err).errors });
            return;
        }
    });
commentRouter.delete("/:id/games/:gameId", isUser(), async(req, res) => {
    let id = req.params.id;
    let comment = await getCommentById(id).lean();
    let gameId = comment.gameId;
    let isValid = await checkCommentId(id);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    await deleteComment(id, gameId, comment);
    res.status(200).json("Record deleted succesfully!");
});

commentRouter.put("/:id", isUser(),
    body("content").isLength({ min: 3 }).withMessage("Comment must be at least 3 symbols long!"),
    async(req, res) => {
        let id = req.params.id;
        let isValid = await checkCommentId(id);
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
            return;
        }
        let content = req.body.content;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await editComment(id, content);
            res.status(200).json("Record edited succesfully!");
        } catch (err) {
            res.statusCode(200).json({ message: errorParser(err).errors });
            return;
        }
    });

module.exports = {
    commentRouter
}