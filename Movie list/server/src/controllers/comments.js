const { Router } = require("express");
const { checkCommentId, getCommentById, createComment, deleteComment, editComment, likeComment, unlikeComment } = require("../services/comments");
const { checkMovieId, getMovieById } = require("../services/movies");

const commentRouter = Router();

commentRouter.get("/:commentId", async(req, res) => {
    const commentId = req.params.commentId;
    const isValid = await checkCommentId(commentId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const comment = await getCommentById(commentId).lean();
    res.json(comment);
})

commentRouter.post("/in/:movieId", async(req, res) => {
    const movieId = req.params.movieId;
    const user = req.user;
    const fields = req.body;
    const isValid = await checkMovieId(movieId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await createComment(movieId, fields, user);
    const movie = await getMovieById(movieId).lean();
    res.json(movie);
})

commentRouter.delete("/:commentId/in/:movieId", async(req, res) => {
    const commentId = req.params.commentId;
    const isValidComment = await checkCommentId(commentId);
    if (!isValidComment) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const movieId = req.params.movieId;
    const isValidMovie = await checkMovieId(movieId);
    if (!isValidMovie) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await deleteComment(movieId, commentId);
    const movie = await getMovieById(movieId).lean();
    res.json(movie);
})

commentRouter.put("/:commentId/in/:movieId", async(req, res) => {
    const commentId = req.params.commentId;
    const isValidComment = await checkCommentId(commentId);
    if (!isValidComment) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const movieId = req.params.movieId;
    const isValidMovie = await checkMovieId(movieId);
    if (!isValidMovie) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const fields = req.body;
    await editComment(commentId, fields);
    const movie = await getMovieById(movieId).lean();
    res.json(movie);
})

commentRouter.post("/:commentId/in/:movieId/like", async(req, res) => {
    const commentId = req.params.commentId;
    const movieId = req.params.movieId;
    const user = req.user;
    const isValidComment = await checkCommentId(commentId);
    if (!isValidComment) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const isValidMovie = await checkMovieId(movieId);
    if (!isValidMovie) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await likeComment(commentId, user);
    const movie = await getMovieById(movieId).lean()
    res.status(200).json(movie);
})

commentRouter.post("/:commentId/in/:movieId/unlike", async(req, res) => {
    const commentId = req.params.commentId;
    const movieId = req.params.movieId;
    const user = req.user;
    const isValidComment = await checkCommentId(commentId);
    if (!isValidComment) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const isValidMovie = await checkMovieId(movieId);
    if (!isValidMovie) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await unlikeComment(commentId, user);
    const movie = await getMovieById(movieId).lean()
    res.status(200).json(movie);
})

module.exports = {
    commentRouter
}