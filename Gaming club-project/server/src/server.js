let express = require("express");
const { expressConfig } = require("./config/express");
const { routerConfig } = require("./config/router");
const { runDB } = require("./config/mongoose");

async function start() {
    await runDB();
    let app = express();

    expressConfig(app);
    routerConfig(app);

    app.listen(3000, () => {
        console.log("Server is listening on http://localhost:3000");
    });
}

start();