console.log(require('dotenv').config({path: '../.env'}));
const grpc = require('grpc'),
    fs = require('fs'),
    lnrpcDescriptor = grpc.load('../rpc.proto'),
    _ = require('lodash'),
    ByteBuffer = require('bytebuffer');

const certPath = `${process.env.LNSERVICE_LND_DIR}/tls.cert`,
    cert = fs.readFileSync(certPath),
    credentials = grpc.credentials.createSsl(cert),
    lightning = new lnrpcDescriptor.lnrpc.Lightning(process.env.LNDSERVICE_ADDRESS, credentials);

function getInfo() {
    return new Promise((resolve, reject) => {
        lightning.GetInfo({}, function (err, response) {
            if (err)
                reject(err);
            else
                resolve(response);
        });
    });
}

function listPeers() {
    return new Promise((resolve, reject) => {
        lightning.ListPeers({}, function (err, response) {
            if (err)
                reject(err);
            else
                resolve(response);
        });
    });
}

function listChannels(listChannelsRequest) {
    return new Promise((resolve, reject) => {
        lightning.ListChannels(listChannelsRequest || {}, function (err, response) {
            if (err)
                reject(err);
            else
                resolve(response);
        });
    });
}

function addInvoice(invoiceRequest) {
    if (!invoiceRequest)
        return new Promise((resolve, reject) => reject(new Error('please provide ListChannelsRequest object')));
    return new Promise((resolve, reject) => {
        lightning.AddInvoice(invoiceRequest, function (err, response) {
            if (err)
                reject(err);
            else
                resolve(response);
        });
    });
}

function sendPayment(paymentHash) {
    return new Promise((resolve, reject) => {
        if (!paymentHash)
            return reject(new Error('please provide a paymentHash'));

        var call = lightning.sendPayment();
        call.on('data', function (payment) {
            console.log('Payment sent:');
            console.log(payment);
            call.end();
            resolve(payment);
        });
        call.on('end', function () {
            console.log('END');
        });

        call.write({payment_request: paymentHash});
    });
}

module.exports = {
    getInfo,
    listPeers,
    listChannels,
    sendPayment,
    Invoice: lnrpcDescriptor.lnrpc.Invoice,
    ListChannelsRequest: lnrpcDescriptor.lnrpc.ListChannelsRequest,
    addInvoice,
};
