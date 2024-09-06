const express = require("express");
const { setCors } = require("../middlewares/cors");

function expressConfig(app) {
    app.use(setCors());
    app.use(express.json());
}

module.exports = {
    expressConfig
}