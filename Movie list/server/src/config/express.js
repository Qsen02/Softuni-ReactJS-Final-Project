const express = require("express");
const { setCors } = require("../middlewares/cors");
const { session } = require("../middlewares/session");

function expressConfig(app) {
    app.use(setCors());
    app.use(session());
    app.use("/images", express.static("images"));
    app.use(express.json());
}

module.exports = {
    expressConfig
}