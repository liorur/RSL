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

/**
 * Creates an invoice.
 * @param invoiceRequest lndClient.Invoice instance
 * message Invoice {
 *     An optional memo to attach along with the invoice. Used for record keeping
 *     purposes for the invoice's creator, and will also be set in the description
 *     field of the encoded payment request if the description_hash field is not
 *     being used.
 *     string memo = 1 [json_name = "memo"];
 *
 *     /// An optional cryptographic receipt of payment
 *     bytes receipt = 2 [json_name = "receipt"];
 *
 *     The hex-encoded preimage (32 byte) which will allow settling an incoming
 *     HTLC payable to this preimage
 *     bytes r_preimage = 3 [json_name = "r_preimage"];
 *
 *     /// The hash of the preimage
 *     bytes r_hash = 4 [json_name = "r_hash"];
 *
 *     /// The value of this invoice in satoshis
 *     int64 value = 5 [json_name = "value"];
 *
 *     /// Whether this invoice has been fulfilled
 *     bool settled = 6 [json_name = "settled"];
 *
 *     /// When this invoice was created
 *     int64 creation_date = 7 [json_name = "creation_date"];
 *
 *     /// When this invoice was settled
 *     int64 settle_date = 8 [json_name = "settle_date"];
 *
 *     A bare-bones invoice for a payment within the Lightning Network.  With the
 *     details of the invoice, the sender has all the data necessary to send a
 *     payment to the recipient.
 *     string payment_request = 9 [json_name = "payment_request"];
 *
 *     Hash (SHA-256) of a description of the payment. Used if the description of
 *     payment (memo) is too long to naturally fit within the description field
 *     of an encoded payment request.
 *     bytes description_hash = 10 [json_name = "description_hash"];
 *
 *     /// Payment request expiry time in seconds. Default is 3600 (1 hour).
 *     int64 expiry = 11 [json_name = "expiry"];
 *
 *     /// Fallback on-chain address.
 *     string fallback_addr = 12 [json_name = "fallback_addr"];
 *
 *     /// Delta to use for the time-lock of the CLTV extended to the final hop.
 *     uint64 cltv_expiry = 13 [json_name = "cltv_expiry"];
 *
 *     Route hints that can each be individually used to assist in reaching the
 *     invoice's destination.
 *     repeated RouteHint route_hints = 14 [json_name = "route_hints"];
 *
 *     /// Whether this invoice should include routing hints for private channels.
 *     bool private = 15 [json_name = "private"];
 * }
 * @returns {Promise} result from LND
 */
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

/**
 *
 * @param options string r_hash | bool settled | bool private
 * @returns {Promise}
 */
function listInvoices(options) {
    return new Promise((resolve, reject) => {
        lightning.ListInvoices({}, function (err, response) {
            if (err)
                return reject(err);
            let invoices = response && typeof response.invoices !== 'undefined' && _.isArray(response.invoices) ? response.invoices : null;
            if (invoices && options) {
                if (typeof options.r_hash !== 'undefined')
                    invoices = invoices.filter(invoice => invoice.r_hash === options.r_hash);
                else {
                    if (typeof options.settled !== 'undefined')
                        invoices = invoices.filter(invoice => invoice.settled === options.settled);

                    if (typeof options.private !== 'undefined')
                        invoices = invoices.filter(invoice => invoice.private === options.private);
                }
            }
            resolve(invoices);
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
    listInvoices,
};
