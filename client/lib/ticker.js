let status;
const https = require('https');

const getTick = () => {
    return new Promise((resolve, reject) => {
        https.get('https://apiv2.bitcoinaverage.com/indices/global/ticker/short?crypto=BTC&fiat=USD', (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                status = JSON.parse(data);
                resolve(status);
            });

        }).on("error", (err) => {
            reject("Error: " + err.message);
        });
    })
};

getTick();
setInterval(getTick, 15000);

module.exports = {tick: () => status};