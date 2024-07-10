const { verifyToken } = require("../services/token");

function session() {
    return function(req, res, next) {
        let token = req.headers['x-authorization'];
        if (token) {
            try {
                let payload = verifyToken(token);
                req.user = payload;
            } catch (err) {
                res.status(403).json({ message: "You dont't have authorization, please login or register!" });
            }
        }
        next();
    }
}

module.exports = {
    session
}