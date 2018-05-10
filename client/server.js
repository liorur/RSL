const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const apiRouter = require('./api-router');
const config = require('./config');



function initServer() {
    const app = express();
    const router = express.Router();
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(router);
    app.use('/', express.static(path.join(__dirname, 'public')))
   // app.use(express.static('public'));
    app.use(apiRouter());


    const server = app.listen(config.SERVER_PORT, () => {
        console.log(`App listening on port ${config.SERVER_PORT}!`);
    });
    return {app, server};
}

module.exports = {initServer};