const { Router } = require("express");
const { checkCommentId, deleteComment, getCommentById, addComment, editComment, likeComment, unlikeComment } = require("../services/comments");
const { isUser } = require("../middlewears/guards");
const { checkGameId, getGameById } = require("../services/games");
const { body, validationResult } = require("express-validator");

const commentRouter = Router();

commentRouter.get("/:id", async(req, res) => {
    let id = req.params.id;
    let isValid = await checkCommentId(id);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" })
    }
    let comment = await getCommentById(id);
    res.json(comment);
})

commentRouter.post("/games/:id",
    isUser(),
    body("content").isLength({ min: 1 }),
    async(req, res) => {
        let user = req.user;
        let id = req.params.id;
        let isValid = await checkGameId(id);
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
            return;
        }
        let content = req.body.content;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw new Error("Please fill the field!");
            }
            await addComment(user.username, content, id);
            const game = await getGameById(id).lean();
            res.json(game);
        } catch (err) {
            res.status(400).json({ message: err.message });
            return;
        }
    });
commentRouter.delete("/:id", isUser(), async(req, res) => {
    let id = req.params.id;
    let comment = await getCommentById(id).lean();
    let gameId = comment.gameId;
    let isValid = await checkCommentId(id);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    await deleteComment(id, gameId, comment);
    const game = await getGameById(gameId).lean();
    res.json(game);
});

commentRouter.put("/:id", isUser(),
    body("content").isLength({ min: 1 }),
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
                throw new Error("Please fill the field!");
            }
            await editComment(id, content);
            let comment = await getCommentById(id);
            const game = await getGameById(comment.gameId);
            res.json(game);
        } catch (err) {
            res.status(400).json({ message: err.message });
            return;
        }
    });

commentRouter.post("/:commentId/like", async(req, res) => {
    const user = req.user;
    const commentId = req.params.commentId;
    const isValid = await checkCommentId(commentId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await likeComment(commentId, user._id);
    res.status(200).json({ message: "Comment liked successfully!" });
})

commentRouter.post("/:commentId/unlike", async(req, res) => {
    const user = req.user;
    const commentId = req.params.commentId;
    const isValid = await checkCommentId(commentId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await unlikeComment(commentId, user._id);
    res.status(200).json({ message: "Comment unliked successfully!" });
})

module.exports = {
    commentRouter
}