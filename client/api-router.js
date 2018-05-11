const express = require('express');
const bodyParser = require('body-parser');
const main = require('./main');
const config = require('dotenv').config({path: './client/.env'}).parsed;

function apiRouter() {
    const router = express.Router();
    router.use(bodyParser.json());
    router.get('/api/state', (_req, res) => {
        res.json({
            ticks: main.getCurrentLog(),
            side: config.SIDE,
            ...main.getStats()
        });
    });
    return router;
}

module.exports = apiRouter;
