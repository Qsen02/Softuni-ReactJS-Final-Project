const { Router } = require("express");
const { checkGameId, deleteGame, getGameById, createGame, editGame, liking, saving, getAllGames, searching, unLike, unSave } = require("../services/games");
const { isUser } = require("../middlewears/guards");
const { errorParser } = require("../util");
const { body, validationResult } = require("express-validator");
const { getUserById } = require("../services/users");

let gameRouter = Router();

gameRouter.get("/", async(req, res) => {
    let games = await getAllGames().lean();
    res.json(games);
})

gameRouter.get("/:id", async(req, res) => {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.status("404").json({ message: "Resource not found!" });
        return;
    }
    let game = await getGameById(id).lean();
    let creator = await getUserById(game.ownerId).lean();
    game.owner = creator.username;
    res.json(game);
})

gameRouter.post("/",
    isUser(),
    body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long!"),
    body("year").isInt({ min: 1960, max: 2030 }).withMessage("Year must be between 1960 and 2030!"),
    body("category").isLength({ min: 3 }).withMessage("Category must be at least 3 characters long!"),
    body("creator").isLength({ min: 3 }).withMessage("Creator must be at least 3 characters long!"),
    body("description").isLength({ min: 20, max: 1000 }).withMessage("Description must be between 20 and 1000 characters long!"),
    body("image").matches(/^https?:\/\//).withMessage("Image must be valid URL!"),
    async(req, res) => {
        let fields = req.body;
        let user = req.user;

        let name = fields.name;
        let year = fields.year;
        let description = fields.description;
        let category = fields.category;
        let creator = fields.creator;
        let image = fields.image;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await createGame({ name, year, description, category, creator, image }, user);
            res.status(200).json({ message: "Record created successfully!" })
        } catch (err) {
            res.status(400).json({ message: JSON.stringify(errorParser(err).errors) });
            return;
        }
    });

gameRouter.get("/search/:value/by/:criteria", async(req, res) => {
    let query = req.params.value;
    let criteria = req.params.criteria;
    let games = await searching(query, criteria).lean();
    res.json(games);
})

gameRouter.delete("/:id", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    await getGameById(id).lean();
    await deleteGame(id);
    res.status(200).json({ message: "Record deleted successfully!" });
});

gameRouter.put("/:id", isUser(),
    body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long!"),
    body("year").isInt({ min: 1960, max: 2030 }).withMessage("Year must be between 1960 and 2030!"),
    body("category").isLength({ min: 3 }).withMessage("Category must be at least 3 characters long!"),
    body("creator").isLength({ min: 3 }).withMessage("Creator must be at least 3 characters long!"),
    body("description").isLength({ min: 20, max: 1000 }).withMessage("Desciption must be between 20 and 1000 characters long!"),
    body("image").matches(/^https?:\/\//).withMessage("Image must be valid URL!"),
    async(req, res) => {
        let id = req.params.id;
        let isValid = await checkGameId(id);
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
            return;
        }
        let fields = req.body;
        let name = fields.name;
        let year = fields.year;
        let description = fields.description;
        let category = fields.category;
        let creator = fields.creator;
        let image = fields.image;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await editGame(id, { name, year, description, category, creator, image });
            let game = await getGameById(id);
            res.json(game)
        } catch (err) {
            res.status(400).json({ message: JSON.stringify(errorParser(err).errors) });
            return;
        }
    });

gameRouter.post("/:id/like", isUser(), async(req, res) => {
    let gameId = req.params.id;
    let userId = req.user._id;
    let isValid = await checkGameId(gameId);
    if (!isValid) {
        res.status(404).json("Resource not found!");
        return;
    }
    await liking(gameId, userId);
    const game = await getGameById(gameId).lean();
    res.json(game);
})

gameRouter.post("/:id/unlike", isUser(), async(req, res) => {
    let gameId = req.params.id;
    let userId = req.user._id;
    let isValid = await checkGameId(gameId);
    if (!isValid) {
        res.status(404).json("Resource not found!");
        return;
    }
    await unLike(gameId, userId);
    const game = await getGameById(gameId).lean();
    res.json(game);
})


gameRouter.post("/:id/save", isUser(), async(req, res) => {
    let gameId = req.params.id;
    let userId = req.user._id;
    let isValid = await checkGameId(gameId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    await saving(gameId, userId);
    const game = await getGameById(gameId).lean();
    res.json(game);
})


gameRouter.post("/:id/unsave", isUser(), async(req, res) => {
    let gameId = req.params.id;
    let userId = req.user._id;
    let isValid = await checkGameId(gameId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    await unSave(gameId, userId);
    const game = await getGameById(gameId).lean();
    res.json(game);
})


module.exports = {
    gameRouter
}