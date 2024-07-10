let express = require("express");
let cookieParser = require("cookie-parser");
const { session } = require("../middlewears/session");
const { setCors } = require("../middlewears/cors");

const secret = "my super secret cookie parser";

function expressConfig(app) {
    app.use(setCors());
    app.use(cookieParser(secret));
    app.use(session());
    app.use(express.json());
}

module.exports = {
    expressConfig
}