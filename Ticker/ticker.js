const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://rsl:D05sV6D82ODda1Dp@rslcluster-lmxb3.mongodb.net/test?retryWrites=true";
let index = 0;
let collection;
MongoClient.connect(uri, function (err, client) {
    if (err) throw err;
    collection = client.db("rsl").collection("rsl");
    collection.drop(function (err, res) {

        console.log("ALL REMOVED");
        const x = 0.5;
        const base = 10000;
        const records = [{
            index: 1,
            invoice_hash: null,
            status: "INITIAL",
            timestamp: 1,
            rate: base,
        }];

        for (let i = 2; i < 100; i++) {
            const movment = x * (Math.floor(Math.random() * 21) - 10);
            records.push({
                index: i,
                status: "NEW",
                timestamp: i,
                rate: base + movment,
            })
        }

        collection.insertMany(records, function (err, res) {
            if (err) throw err;
        });


    });


});
//
// let status;
// const https = require('https');
//
// const getTick = () => {
//     https.get('https://apiv2.bitcoinaverage.com/indices/global/ticker/short?crypto=BTC&fiat=USD', (resp) => {
//         let data = '';
//
//         // A chunk of data has been recieved.
//         resp.on('data', (chunk) => {
//             data += chunk;
//         });
//
//         // The whole response has been received. Print out the result.
//         resp.on('end', () => {
//             status = JSON.parse(data);
//             if (collection) {
//                 const record = {
//                     index,
//                     invoice_hash: null,
//                     status: index ? "NEW": "INITIAL",
//                     timestamp: status.BTCUSD.timestamp,
//                     rate: status.BTCUSD.last,
//                 };
//                 collection.insertOne(record, function (err, res) {
//                     if (err) throw err;
//                     console.log("1 document inserted");
//                     console.log(record);
//                 });
//                 index++;
//             }
//
//
//         }).on("error", (err) => {
//             reject("Error: " + err.message);
//         });
//     })
// };
//
// getTick();
// setInterval(getTick, 10000);
