const jwt = require("jsonwebtoken");

const secret = "My super secret token";

function setToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
    }

    const token = jwt.sign(payload, secret, { expiresIn: "3d" });

    return token;
}

function verifyToken(token) {
    const isValid = jwt.verify(token, secret);

    return isValid;
}

module.exports = {
    setToken,
    verifyToken
}