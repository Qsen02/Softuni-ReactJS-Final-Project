const { Comments } = require("../models/comments");
const { Movies } = require("../models/movies");

function getCommentById(commentId) {
    const comment = Comments.findById(commentId).populate("likes").populate("answers");
    return comment;
}

async function createComment(movieId, data, user) {
    const newComment = new Comments(data);
    newComment.ownerId = user._id;
    newComment.movieId = movieId;
    await newComment.save();
    await Movies.findByIdAndUpdate(movieId, { $push: { comments: newComment._id } });
}

async function deleteComment(movieId, commentId) {
    const comment = await Comments.findById(commentId).lean();
    await Comments.findByIdAndDelete(commentId);
    await Movies.findByIdAndUpdate(movieId, { $pull: { comments: comment._id } });
}

async function editComment(commentId, data) {
    await Comments.findByIdAndUpdate(commentId, { $set: data });
}

async function likeComment(commentId, user) {
    await Comments.findByIdAndUpdate(commentId, { $push: { likes: user._id } });
}

async function unlikeComment(commentId, user) {
    await Comments.findByIdAndUpdate(commentId, { $pull: { likes: user._id } });
}

async function checkCommentId(commentId) {
    const comments = await Comments.find().lean();
    const isValid = comments.find(el => el._id.toString() == commentId);
    if (isValid) {
        return true;
    }
    return false;
}

module.exports = {
    getCommentById,
    createComment,
    editComment,
    deleteComment,
    likeComment,
    unlikeComment,
    checkCommentId
}