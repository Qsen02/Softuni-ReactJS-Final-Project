const { userRouter } = require("../contorllers/users");
const { gameRouter } = require("../contorllers/games");
const { commentRouter } = require("../contorllers/comments");
const { imageRouter } = require("../contorllers/images");

function routerConfig(app) {
    app.use("/images", imageRouter)

    app.use("/games", gameRouter);

    app.use("/comments", commentRouter);

    app.use("/users", userRouter);

    app.get("*", (req, res) => {
        res.status(404).json({ message: "Page not found!" });
    })
}

module.exports = {
    routerConfig
}