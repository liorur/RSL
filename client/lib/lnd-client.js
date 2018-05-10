const grpc = require('grpc'),
    fs = require('fs'),
    lnrpcDescriptor = grpc.load('../../rpc.proto');

// Due to updated ECDSA generated tls.cert we need to let gprc know that
// we need to use that cipher suite otherwise there will be a handhsake
// error when we communicate with the lnd rpc server.
process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA';

var cert = fs.readFileSync('/Users/jacobdvir/Library/Application Support/Lnd/tls.cert');
var credentials = grpc.credentials.createSsl(cert);
var lightning = new lnrpcDescriptor.lnrpc.Lightning('127.0.0.1:10009', credentials);

lightning.getInfo({}, function (err, response) {
    if (err)
        console.error(err);
    else
        console.log('GetInfo:', response);
});