const { Movies } = require("../models/movies");

function getAllMovies() {
    const movies = Movies.find();
    return movies;
}

function getMovieById(movieId) {
    const movies = Movies.findById(movieId).populate("comments");
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

async function createMovie(data, user) {
    const newMovie = new Movies(data);
    newMovie.ownerId = user._id;
    await newMovie.save();
    return newMovie;
}

async function deleteMovie(movieId) {
    await Movies.findByIdAndDelete(movieId);
}

async function editMovie(movieId, data) {
    await Movies.findByIdAndUpdate(movieId, { $set: data });
}

async function likeMovie(movieId, user) {
    await Movies.findByIdAndUpdate(movieId, { $push: { likes: user._id } });
}

async function unlikeMovie(movieId, user) {
    await Movies.findByIdAndUpdate(movieId, { $pull: { likes: user._id } });
}

async function saveMovie(movieId, user) {
    await Movies.findByIdAndUpdate(movieId, { $push: { saves: user._id } });
}

async function unsaveMovie(movieId, user) {
    await Movies.findByIdAndUpdate(movieId, { $pull: { saves: user._id } });
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
    checkMovieId
}