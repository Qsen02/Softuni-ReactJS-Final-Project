const mongoose = require("mongoose");
const { Users } = require("../models/users");
const { Movies } = require("../models/movies");
const { Comments } = require("../models/comments");
const { Answers } = require("../models/answer");

async function runDB() {
    await mongoose.connect("mongodb://localhost:27017/Movie-list");
    console.log("Database connected");
}

module.exports = {
    runDB
}