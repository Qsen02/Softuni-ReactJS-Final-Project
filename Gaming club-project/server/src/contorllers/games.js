const { Router } = require("express");
const { checkGameId, deleteGame, getGameById, createGame, editGame, liking, saving, getAllGames, searching } = require("../services/games");
const { delImg } = require("../services/image");
const { isUser } = require("../middlewears/guards");
const { upload } = require("../config/multer");
const { errorParser } = require("../util");
const { body, validationResult } = require("express-validator");

let gameRouter = Router();

gameRouter.get("/", async(req, res) => {
    let games = await getAllGames().lean();
    res.json(games);
})

gameRouter.get("/:id", async(req, res) => {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.status(404).json({ message: "Page not found!" });
        return;
    }
    let game = await getGameById(id).lean();
    res.json(game);
})

gameRouter.post("/",
    isUser(),
    body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long!"),
    body("year").isInt({ min: 1960, max: 2030 }).withMessage("Year must be between 1960 and 2030!"),
    body("category").isLength({ min: 3 }).withMessage("Category must be at least 3 characters long!"),
    body("creator").isLength({ min: 3 }).withMessage("Creator must be at least 3 characters long!"),
    body("description").isLength({ min: 20, max: 1000 }).withMessage("Desciption must be between 20 and 1000 characters long!"),
    upload.single("image"),
    async(req, res) => {
        let fields = req.body;
        let user = req.user;

        let name = fields.name;
        let year = fields.year;
        let description = fields.description;
        let category = fields.category;
        let creator = fields.creator;
        let imgPath = "";
        if (req.file) {
            let imgFile = req.file;
            imgPath = imgFile.path;
        }
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await createGame({ name, year, description, category, creator, image: "http://localhost:3000/" + imgPath }, user);
            res.status(200).json({ message: "Record created successfully!" })
        } catch (err) {
            res.status(400).json({ message: errorParser(err).errors });
            return;
        }
    });

gameRouter.get("/search", async(req, res) => {
    let query = req.query;
    let games = await searching(query).lean();
    res.json(games);
})

gameRouter.delete("/:id", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.status("404").json("Page not found!");
        return;
    }
    let game = await getGameById(id).lean();
    let img = game.image;
    let imgArr = img.split("\\");
    let imgName = imgArr[imgArr.length - 1];
    await deleteGame(id);
    if (imgName) {
        await delImg(imgName);
    }
    res.status(200).json("Record deleted successfully!");
});

gameRouter.put("/:id", isUser(),
    body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long!"),
    body("year").isInt({ min: 1960, max: 2030 }).withMessage("Year must be between 1960 and 2030!"),
    body("category").isLength({ min: 3 }).withMessage("Category must be at least 3 characters long!"),
    body("creator").isLength({ min: 3 }).withMessage("Creator must be at least 3 characters long!"),
    body("description").isLength({ min: 20, max: 1000 }).withMessage("Desciption must be between 20 and 1000 characters long!"),
    upload.single("image"),
    async(req, res) => {
        let id = req.params.id;
        let isValid = await checkGameId(id);
        if (!isValid) {
            res.status("404").json("Page not found!");
            return;
        }
        let game = await getGameById(id).lean();
        let fields = req.body;
        let name = fields.name;
        let year = fields.year;
        let description = fields.description;
        let category = fields.category;
        let creator = fields.creator;
        let imgPath = "";
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            if (req.file) {
                let imgFile = req.file;
                imgPath = imgFile.path;
                let img = game.image;
                let imgArr = img.split("\\");
                let imgName = imgArr[imgArr.length - 1];
                await editGame(id, { name, year, description, category, creator, image: "http://localhost:3000/" + imgPath });
                if (imgName && imgName != "gaming-banner-for-games-with-glitch-effect-neon-light-on-text-illustration-design-free-vector.jpg") {
                    await delImg(imgName);
                }
            } else {
                await editGame(id, { name, year, description, category, creator });
            }
            res.status(200).json("Record edited successfully");
        } catch (err) {
            res.status(400).json({ message: errorParser(err).errors });
            return;
        }
    });

gameRouter.post("/:id/like", isUser(), async(req, res) => {
    let gameId = req.params.id;
    let userId = req.user._id;
    let isValid = await checkGameId(gameId);
    if (!isValid) {
        res.status("404").json("Page not found!");
        return;
    }
    await liking(gameId, userId);
    res.status(200).json({ message: "Game was liked successfully!" });
})

gameRouter.post("/:id/save", isUser(), async(req, res) => {
    let gameId = req.params.id;
    let userId = req.user._id;
    let isValid = await checkGameId(gameId);
    if (!isValid) {
        res.status("404").json("Page not found!");
        return;
    }
    await saving(gameId, userId);
    res.status(200).json({ message: "Game was saved successfully!" });
})

module.exports = {
    gameRouter
}