const { userRouter } = require("../contorllers/users");
const { gameRouter } = require("../contorllers/games");
const { commentRouter } = require("../contorllers/comments");
const { answerRouter } = require("../contorllers/answers");

function routerConfig(app) {
    app.use("/games", gameRouter);

    app.use("/comments", commentRouter);

    app.use("/users", userRouter);

    app.use("/answers", answerRouter);

    app.get("*", (req, res) => {
        res.status(404).json({ message: "Resource not found!" });
    })
}

module.exports = {
    routerConfig
}