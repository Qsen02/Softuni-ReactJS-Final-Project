const express = require("express");
const { expressConfig } = require("./config/express");
const { runDB } = require("./config/mongoose");

const app = express();

const port = 3000;

async function start() {
    await runDB();

    expressConfig(app);

    app.listen(() => {
        console.log(`Server is listening on port ${port}`);
    })
}

start();