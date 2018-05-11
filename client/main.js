const config = require('dotenv').config({path: './.env'}).parsed;
const MongoClient = require('mongodb').MongoClient;


const _PENDING_ = "PENDING";
const _INITIAL_ = "INITIAL";
const _FULFILLED_ = "FULFILLED";
const _NEW_ = "NEW";
const _STABLE_ = "STABLE";
const _LONG_ = "LONG";
let baseSum = 1000;
let currentSum;
let baseRate;
let currentRate;

const uri = "mongodb+srv://rsl:D05sV6D82ODda1Dp@rslcluster-lmxb3.mongodb.net/test?retryWrites=true";
let collection;
MongoClient.connect(uri, function (err, client) {
    if (err) throw err;
    collection = client.db("rsl").collection("rsl");
});

const Start = () => {
    setInterval(update, 2000);
};

let currentLog = [];

const update = () => {
    collection && collection.find(
        {}
    ).toArray(function (err, result) {
        currentLog = result.sort((a, b) => {
            return a.index - b.index;
        });
        review(config.SIDE);
    });
};

const review = (side) => {

    let longSum = 0;
    let stableSum = 0;

    currentLog.forEach((element) => {
        if (element.status === _FULFILLED_) {
            console.log(element);
            if (element.receiving_side === _LONG_) {
                longSum += element.satoshies_to_send;
            }
            if (element.receiving_side === _STABLE_) {
                stableSum += element.satoshies_to_send;
            }
        }
    });


    const initial = currentLog.find(function (element) {
        return element.status === _INITIAL_;
    });

    const pending = currentLog.find(function (element) {
        return element.status === _PENDING_;
    });

    const fulfilled = currentLog.slice().reverse().find(function (element) {
        return element.status === _FULFILLED_;
    });

    const newTick = currentLog.find(function (element) {
        return element.status === _NEW_;
    });

    baseRate = initial.rate;

    // console.log(_INITIAL_, initial);
    // console.log(_NEW_, newTick);
    // console.log(_PENDING_, pending);
    // console.log(_FULFILLED_, fulfilled);

    const lastResolved = fulfilled || initial;
    const firtsUnresolved = pending || newTick;

    currentRate = lastResolved.rate;

    if (side == _LONG_) {
        const btc = SatoshiToBTC(longSum - stableSum);
        currentSum = (baseSum + btc * currentRate).toFixed(2);

        console.log("longSum", longSum);
        console.log("stableSum", stableSum);
        console.log("btc", btc);
        console.log("currentSum", currentSum);
    }
    if (side == _STABLE_) {
        const btc = SatoshiToBTC(stableSum - longSum);
        currentSum = (baseSum + btc * currentRate).toFixed(2);
    }

    if (!firtsUnresolved) {
        return
    }
    if (lastResolved.rate < firtsUnresolved.rate) {
        if (side === _LONG_) {
            if (firtsUnresolved.status === _PENDING_) {
                checkAndFulfill(firtsUnresolved.index, firtsUnresolved.invoice_hash);
            } else {
                sendInvoice(firtsUnresolved.index, calculateDiff(initial.rate, lastResolved.rate, firtsUnresolved.rate), side);
            }
        }
        if (side === _STABLE_ && firtsUnresolved.invoice_hash) {
            payInvoice(firtsUnresolved.invoice_hash);
        }
    }

    if (lastResolved.rate > firtsUnresolved.rate) {
        if (side === _STABLE_) {
            if (firtsUnresolved.status === _PENDING_) {
                checkAndFulfill(firtsUnresolved.index, firtsUnresolved.invoice_hash);
            } else {
                sendInvoice(firtsUnresolved.index, calculateDiff(initial.rate, lastResolved.rate, firtsUnresolved.rate), side);
            }
        }
        if (side === _STABLE_ && firtsUnresolved.invoice_hash) {
            payInvoice(firtsUnresolved.invoice_hash);
        }
    }
};

const sendInvoice = (index, stoshisToSend, side) => {
    const invoice = createInvoice(stoshisToSend);
    const record = {
        $set: {
            invoice_hash: invoice,
            status: _PENDING_,
            receiving_side: side,
            satoshies_to_send: stoshisToSend
        }
    };
    collection.updateOne({index}, record, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
};


const calculateDiff = (intialRate, lastFulfilledRate, currentRate) => {
    const shouldHave = BTCtoSatoshi(baseSum * (1 / currentRate));
    const currentlyHas = BTCtoSatoshi(baseSum * (1 / lastFulfilledRate));
    return Math.abs(shouldHave - currentlyHas);
};

const BTCtoSatoshi = (sum) => Math.round(100000000 * sum);
const SatoshiToBTC = (sum) => (sum / 100000000);

const checkAndFulfill = (index, invoice) => {
    if (isFulfilled(invoice)) {
        const record = {
            $set: {
                status: _FULFILLED_,
            }
        };
        collection.updateOne({index}, record, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
        });
    }
};


const payInvoice = (invoice_hash) => {
    console.log("payInvoice");
};

const createInvoice = (sum) => {
    console.log("createInvoice");
    return "_INVOICE_" + sum;
};

const isFulfilled = () => {
    console.log("isFulfilled");
    return true;
};

const getCurrentLog = () => {
    return currentLog;
};

const getStats = () => {
    return {
        baseSum,
        currentSum,
        baseRate,
        currentRate
    };
};

module.exports = {Start, getCurrentLog, getStats};