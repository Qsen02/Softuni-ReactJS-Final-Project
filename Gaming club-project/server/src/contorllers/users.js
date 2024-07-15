const { Router } = require("express");
const { setToken } = require("../services/token");
const { register, login } = require("../services/users");
const { body, validationResult } = require("express-validator");
const { errorParser } = require("../util");

let userRouter = Router();

userRouter.post("/register",
    body("username").trim().isLength({ min: 3 }).withMessage("Username must be at least 3 symbols long!"),
    body("email").trim().isLength({ min: 3 }).isEmail().withMessage("Email must be at least 3 symbols long!"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 symbols and may contain onlu digits and letters!"),
    body("repass").trim().custom((value, { req }) => req.body.password == value).withMessage("Password must match!"),
    async(req, res) => {
        let fields = req.body;
        let username = fields.username;
        let password = fields.password;
        let email = fields.email;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            let user = await register(username, email, password);
            let token = setToken(user);
            res.cookie("token", token, { httpOnly: true });
            res.json({ _id: user._id, username: user.username, email: user.email, accessToken: token });
        } catch (err) {
            res.status(400).json({ message: JSON.stringify(errorParser(err).errors) });
        }
    });

userRouter.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json("User logged out successfully!");
})

userRouter.post("/login",
    body("username").trim().isLength({ min: 3 }).withMessage("Username must be at least 3 symbols long!"),
    body("password").trim().isAlphanumeric().isLength({ min: 6 }).withMessage("Password must be at least 6 symbols and may contain onlu digits and letters!"),
    async(req, res) => {
        let fields = req.body;
        let username = fields.username;
        let password = fields.password;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            let user = await login(username, password);
            let token = setToken(user);
            res.cookie("token", token, { httpOnly: true });
            res.json({ _id: user._id, username: user.username, email: user.email, accessToken: token });
        } catch (err) {
            res.status(400).json({ message: JSON.stringify(errorParser(err).errors) });
            return;
        }
    });

module.exports = {
    userRouter
}