const { answerRouter } = require("../controllers/answers");
const { commentRouter } = require("../controllers/comments");
const { movieRouter } = require("../controllers/movies");
const { userRouter } = require("../controllers/user");

function routerConfig(app) {
    app.use("/users", userRouter);

    app.use("/movies", movieRouter);

    app.use("/comments", commentRouter);

    app.use("/answers", answerRouter);

    app.get("*", (req, res) => {
        res.status(404).json({ message: "Resource not found!" });
    })
}

module.exports = {
    routerConfig
}