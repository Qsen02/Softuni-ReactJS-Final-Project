function isUser() {
    return function(req, res, next) {
        if (!req.headers["x-authorization"]) {
            res.status(401).json({ message: "You are not allowed to do this!" });
        }
        next();
    }
}

module.exports = {
    isUser
}