const express = require('express');
const bodyParser = require('body-parser');

function apiRouter() {
    const router = express.Router();
    router.use(bodyParser.json());
    router.get('/api/state', (_req, res) => {
        res.json({a: 'Yey', b: 434});
    });
    return router;
}

module.exports = apiRouter;
