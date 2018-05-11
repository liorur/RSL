const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://rsl:D05sV6D82ODda1Dp@rslcluster-lmxb3.mongodb.net/test?retryWrites=true";
let index = 0;
let collection;
MongoClient.connect(uri, function (err, client) {
    if (err) throw err;
    collection = client.db("rsl").collection("rsl");
    collection.drop(function (err, res) {

        console.log("ALL REMOVED");
        const x = 5;
        const base = 10000;
        let record;
        record = {
            index: 1,
            invoice_hash: null,
            status: "INITIAL",
            timestamp: 1,
            rate: base,
        };
        collection.insertOne(record, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            console.log(record);
        });

        record = {
            index: 2,
            invoice_hash: null,
            status: "NEW",
            timestamp: 2,
            rate: base + 2 * x,
        };
        collection.insertOne(record, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            console.log(record);
        });


        record = {
            index: 3,
            invoice_hash: null,
            status: "NEW",
            timestamp: 3,
            rate: base + 4 * x,
        };
        collection.insertOne(record, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            console.log(record);
        });

        record = {
            index: 4,
            invoice_hash: null,
            status: "NEW",
            timestamp: 4,
            rate: base,
        };
        collection.insertOne(record, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            console.log(record);
        });

        record = {
            index: 5,
            invoice_hash: null,
            status: "NEW",
            timestamp: 5,
            rate: base - x,
        };
        collection.insertOne(record, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            console.log(record);
        });

        record = {
            index: 6,
            invoice_hash: null,
            status: "NEW",
            timestamp: 6,
            rate: base + x,
        };
        collection.insertOne(record, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            console.log(record);
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
