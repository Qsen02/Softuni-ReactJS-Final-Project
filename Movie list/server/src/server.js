const express = require("express");
const { expressConfig } = require("./config/express");

const app = express();

const port = 3000;

async function start() {
    expressConfig(app);

    app.listen(() => {
        console.log(`Server is listening on port ${port}`);
    })
}

start();