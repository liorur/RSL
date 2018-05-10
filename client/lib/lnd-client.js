console.log(require('dotenv').config({path: '../../.env'}));
const grpc = require('grpc'),
    fs = require('fs'),
    lnrpcDescriptor = grpc.load('../../rpc.proto');

const certPath = `${process.env.LNSERVICE_LND_DIR}/tls.cert`,
    cert = fs.readFileSync(certPath),
    credentials = grpc.credentials.createSsl(cert),
    lightning = new lnrpcDescriptor.lnrpc.Lightning(process.env.LNDSERVICE_ADDRESS, credentials);

function getInfo() {
    return new Promise((resolve, reject) => {
        lightning.getInfo({}, function (err, response) {
            if (err)
                reject(err);
            else
                resolve(response);
        });
    });
}

async function getIntoAsync() {
    try {
        return await getInfo();
    } catch (e) {
        throw e;
    }
}

module.exports = {getInfo, getIntoAsync};

getIntoAsync()
    .then(info => console.log(info))
    .catch(err => console.error(err));

