const express = require('express');
const bodyParser = require('body-parser');
const ticker = require('./lib/ticker');

function apiRouter() {
    const router = express.Router();
    router.use(bodyParser.json());
    router.get('/api/state', (_req, res) => {
        res.json(ticker.tick());
    });
    return router;
}

module.exports = apiRouter;
