const express = require("express");
const { runDB } = require("./config/mongoose");
const { expressConfig } = require("./config/express");
const { routerConfig } = require("./config/router");

const port = 3000;

async function starting() {
    await runDB();

    const app = express();

    expressConfig(app);
    routerConfig(app);

    app.listen(port, () => {
        console.log(`Server is listening on ${port}`);
    });
}

starting();