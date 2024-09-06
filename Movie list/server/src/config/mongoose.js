const mongoose = require("mongoose");

async function runDB() {
    await mongoose.connect("mongodb://localhost:27017/Movie-list");
    console.log("Database connected");
}

module.exports = {
    runDB
}