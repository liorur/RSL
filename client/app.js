const server = require('./server');

async function main() {
    // statics and api server
    server.initServer();
}

main()
    .then(() => console.log('running'))
    .catch(err => console.log(`error: ${err}`));

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    });
