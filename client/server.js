const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const proxy = require('http-proxy-middleware');
const apiRouter = require('./api-router');
const config = require('./config');
const main = require('./main');
var cors = require('cors')

function initServer() {
    const app = express();
    const router = express.Router();
    app.use(cors())
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(router);
    app.use(apiRouter());

    main.Start();
    //router.use('/public', proxy({target: 'http://localhost:3000/',}));
    //router.use('/static/js/bundle.js', proxy({target: 'http://localhost:3000/static/js/bundle.js',}));

// // Any route should render the web app html (hosted by by Webpack-dev-server)
//     router.use('**', proxy(
//         {
//             target: 'http://localhost:3000/',
//             //           pathRewrite: path => '/public/index.html',
//         }));


    const server = app.listen(config.SERVER_PORT, () => {
        console.log(`App listening on port ${config.SERVER_PORT}!`);
    });
    return {app, server};
}

module.exports = {initServer};