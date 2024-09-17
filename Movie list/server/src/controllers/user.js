const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { register, checkUserId, getUserById, login, editUser, changePassword } = require("../services/user");
const { setToken } = require("../services/token");

const userRouter = Router();

userRouter.post("/register",
    body("username").trim().isLength({ min: 3 }),
    body("email").trim().isEmail().isLength({ min: 3 }),
    body("password").trim().matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?\/~`|-]).{6,}$/),
    body("repass").trim().custom((value, { req }) => req.body.password == value),
    async(req, res) => {
        const fields = req.body;
        try {
            const results = validationResult(req);
            if (results.errors.length) {
                throw new Error("Your data isn't in valid format!");
            }
            const user = await register(fields.username, fields.email, fields.password);
            const token = setToken(user);
            res.json({ _id: user._id, username: user.username, email: user.email, accessToken: token, isAdmin: user.isAdmin });
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    })

userRouter.post("/login",
    body("username").trim().isLength({ min: 3 }),
    body("password").trim().matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?\/~`|-]).{6,}$/),
    async(req, res) => {
        const fields = req.body;
        try {
            const results = validationResult(req);
            if (results.errors.length) {
                throw new Error("Username or password don't match!");
            }
            const user = await login(fields.username, fields.password);
            const token = setToken(user);
            res.json({ _id: user._id, username: user.username, email: user.email, accessToken: token, isAdmin: user.isAdmin });
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    })

userRouter.get("/logout", (req, res) => {
    res.status(200).json({ message: "Logout was successfull!" });
})

userRouter.get("/:userId", async(req, res) => {
    const userId = req.params.userId;
    const isValid = await checkUserId(userId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const user = await getUserById(userId).lean();
    res.json(user);
})

userRouter.put("/:userId/edit",
    body("profileImage").trim().matches(/^https?:\/\//),
    body("username").trim().isLength({ min: 3 }),
    body("email").trim().isEmail().isLength({ min: 3 }),
    async(req, res) => {
        const fields = req.body;
        const userId = req.params.userId;
        const isValid = await checkUserId(userId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        try {
            const results = validationResult(req);
            if (results.errors.length) {
                throw new Error("Your data is not in valid format!");
            }
            await editUser(userId, fields.profileImage, fields.username, fields.email);
            const user = await getUserById(userId).lean();
            res.json(user);
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    })

userRouter.put("/:userId/change/password",
    body("newPassword").trim().matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?\/~`|-]).{6,}$/),
    async(req, res) => {
        const fields = req.body;
        const userId = req.params.userId;
        const isValid = await checkUserId(userId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        try {
            const results = validationResult(req);
            if (results.errors.length) {
                throw new Error("Your data is not in valid format!");
            }
            const user = await getUserById(userId).lean();
            await changePassword(fields.newPassword, user);
            const newUser = await getUserById(userId).lean();
            res.json(newUser);
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    })

module.exports = {
    userRouter
}