const mongoose = require("mongoose");
const { Users } = require("../models/users");
const { Movies } = require("../models/movies");

async function runDB() {
    await mongoose.connect("mongodb://localhost:27017/Movie-list");
    console.log("Database connected");
}

module.exports = {
    runDB
}