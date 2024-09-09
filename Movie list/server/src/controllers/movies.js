const { Router } = require("express");
const { getAllMovies, checkMovieId, getMovieById, searchMovie, pagination, createMovie, editMovie, deleteMovie, likeMovie, unlikeMovie, saveMovie, unsaveMovie, getTopThree } = require("../services/movies");
const { body, validationResult } = require("express-validator");

const movieRouter = Router();

movieRouter.get("/", async(req, res) => {
    const movies = await getAllMovies().lean();
    res.json(movies);
})

movieRouter.get("/:movieId", async(req, res) => {
    const movieId = req.params.movieId;
    const isValid = await checkMovieId(movieId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const movie = await getMovieById(movieId).lean();
    res.json(movie);
})

movieRouter.get("/search/:query", async(req, res) => {
    let query = req.params.query;
    if (query == "empty") {
        query = "";
    }
    const results = await searchMovie(query).lean();
    res.json(results);
})

movieRouter.get("/page/:pageNumber", async(req, res) => {
    const page = req.params.pageNumber;
    const movies = await pagination(page).lean();
    res.json(movies);
})

movieRouter.post("/",
    body("title").isLength({ min: 3 }),
    body("genre").isLength({ min: 2 }),
    body("image").matches(/^https?:\/\//),
    body("year").isInt({ min: 1960, max: 2030 }),
    body("description").isLength({ min: 10, max: 200 }),
    async(req, res) => {
        const fields = req.body;
        const user = req.user;
        try {
            const results = validationResult(req);
            if (results.errors.length) {
                throw new Error("Your data is not in valid format!");
            }
            const newMovie = await createMovie(fields, user);
            res.json(newMovie);
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    })

movieRouter.put("/:movieId",
    body("title").isLength({ min: 3 }),
    body("genre").isLength({ min: 2 }),
    body("image").matches(/^https?:\/\//),
    body("year").isInt({ min: 1960, max: 2030 }),
    body("description").isLength({ min: 10, max: 200 }),
    async(req, res) => {
        const movieId = req.params.movieId;
        const fields = req.body;
        const isValid = await checkMovieId(movieId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        try {
            const results = validationResult(req);
            if (results.errors.length) {
                throw new Error("Your data is not in valid format!");
            }
            await editMovie(movieId, fields);
            const movie = await getMovieById(movieId);
            res.json(movie);
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    })

movieRouter.delete("/:movieId", async(req, res) => {
    const movieId = req.params.movieId;
    const isValid = await checkMovieId(movieId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await deleteMovie(movieId);
    res.status(200).json({ message: "Record was deleted successfully!" });
})

movieRouter.post("/:movieId/like", async(req, res) => {
    const movieId = req.params.movieId;
    const user = req.user;
    const isValid = await checkMovieId(movieId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await likeMovie(movieId, user);
    res.status(200).json({ message: "Record was liked successfully!" })
})

movieRouter.post("/:movieId/unlike", async(req, res) => {
    const movieId = req.params.movieId;
    const user = req.user;
    const isValid = await checkMovieId(movieId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await unlikeMovie(movieId, user);
    res.status(200).json({ message: "Record was unliked successfully!" })
})

movieRouter.post("/:movieId/save", async(req, res) => {
    const movieId = req.params.movieId;
    const user = req.user;
    const isValid = await checkMovieId(movieId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await saveMovie(movieId, user);
    res.status(200).json({ message: "Record was saved successfully!" })
})

movieRouter.post("/:movieId/unsave", async(req, res) => {
    const movieId = req.params.movieId;
    const user = req.user;
    const isValid = await checkMovieId(movieId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await unsaveMovie(movieId, user);
    res.status(200).json({ message: "Record was unsaved successfully!" })
})

movieRouter.get("/top/movies", async(req, res) => {
    const movies = await getTopThree();
    res.json(movies);
})

module.exports = {
    movieRouter
}