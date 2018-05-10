console.log(require('dotenv').config({path: '../.env'}));
const grpc = require('grpc'),
    fs = require('fs'),
    lnrpcDescriptor = grpc.load('../rpc.proto');

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

function listChannels(active_only = true, inactive_only = false, public_only = false, private_only = false) {
    return new Promise((resolve, reject) => {
        lightning.ListChannels({
            active_only,
            inactive_only,
            public_only,
            private_only,
        }, function (err, response) {
            if (err)
                reject(err);
            else
                resolve(response);
        });
    });
}

module.exports = {
    getInfo,
    listPeers,
    listChannels,
};
