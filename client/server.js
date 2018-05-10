const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const proxy = require('http-proxy-middleware');
const apiRouter = require('./api-router');
const config = require('./config');


function initServer() {
    const app = express();
    const router = express.Router();
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(router);
    app.use(apiRouter());

    router.use('/', proxy(
        {
            target: 'http://localhost:3000/',
        }));


    const server = app.listen(config.SERVER_PORT, () => {
        console.log(`App listening on port ${config.SERVER_PORT}!`);
    });
    return {app, server};
}

module.exports = {initServer};