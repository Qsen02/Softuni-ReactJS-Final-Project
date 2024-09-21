const { Movies } = require("../models/movies");
const { Users } = require("../models/users");

function getAllMovies() {
    const movies = Movies.find();
    return movies;
}

function getMovieById(movieId) {
    const movies = Movies.findById(movieId).populate("comments").populate("likes").populate("saves");
    return movies;
}

function searchMovie(query) {
    const results = Movies.find({ title: RegExp(query, "i") });
    return results;
}

function pagination(page) {
    const skipCount = Number(page) * 6;
    return Movies.find().skip(skipCount).limit(6);
}

function getTopThree() {
    const movies = Movies.aggregate([{ $addFields: { likesCount: { $size: "$likes" } } }, { $sort: { likesCount: -1 } }, { $limit: 3 }]);
    return movies;
}

async function createMovie(data, user) {
    const newMovie = new Movies(data);
    newMovie.ownerId = user._id;
    await newMovie.save();
    await Users.findByIdAndUpdate(user._id.toString(), { $push: { createdMovies: newMovie._id } });
    return newMovie;
}

async function deleteMovie(movie, user) {
    await Movies.findByIdAndDelete(movie._id.toString());
    await Users.findByIdAndUpdate(user._id.toString(), { $pull: { createdMovies: movie._id } })
}

async function editMovie(movieId, data) {
    await Movies.findByIdAndUpdate(movieId, { $set: data });
}

async function likeMovie(movie, user) {
    await Users.findByIdAndUpdate(user._id.toString(), { $push: { likedMovies: movie._id } });
    await Movies.findByIdAndUpdate(movie._id.toString(), { $push: { likes: user._id } });
}

async function unlikeMovie(movie, user) {
    await Users.findByIdAndUpdate(user._id.toString(), { $pull: { likedMovies: movie._id } });
    await Movies.findByIdAndUpdate(movie._id.toString(), { $pull: { likes: user._id } });
}

async function saveMovie(movie, user) {
    await Users.findByIdAndUpdate(user._id.toString(), { $push: { savedMovies: movie._id } });
    await Movies.findByIdAndUpdate(movie._id.toString(), { $push: { saves: user._id } });
}

async function unsaveMovie(movie, user) {
    await Users.findByIdAndUpdate(user._id.toString(), { $pull: { savedMovies: movie._id } });
    await Movies.findByIdAndUpdate(movie._id.toString(), { $pull: { saves: user._id } });
}

async function checkMovieId(movieId) {
    const movies = await Movies.find().lean();
    const isValid = movies.find(el => el._id.toString() == movieId);
    if (isValid) {
        return true;
    }
    return false;
}

module.exports = {
    getAllMovies,
    getMovieById,
    searchMovie,
    pagination,
    editMovie,
    deleteMovie,
    createMovie,
    saveMovie,
    unsaveMovie,
    likeMovie,
    unlikeMovie,
    checkMovieId,
    getTopThree
}