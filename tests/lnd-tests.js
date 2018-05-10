const lndClient = require('../client/lib/lnd-client');

lndClient.getInfo()
    .then(info => console.log(info))
    .catch(err => console.error(err));
//
// lndClient.listPeers()
//     .then(info => console.log(info))
//     .catch(err => console.error(err));
//
// lndClient.listChannels(new lndClient.ListChannelsRequest())
//     .then(info => console.log(info))
//     .catch(err => console.error(err));

// lndClient.sendPayment(process.env.REMOTE_PUBKEY, 10)
//     .then(info => console.log(info))
//     .catch(err => console.error(err));

lndClient.addInvoice(new lndClient.Invoice())
    .then(info => console.log(info))
    .catch(err => console.error(err));