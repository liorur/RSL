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

// lndClient.sendPayment('lntb10u1pd0fpc5pp5f92maktz20pv3caxuug0uteq3sd8lh4p6qtfv52eeegt52fs9fvqdqqcqzysk0ypu35alr47l2teel67cd2zk3xynpsze6edtufukqx00enc6slpejz3d63ash9rylfr3z50z08fqw0l8rmtn3q0wwhe65uguzv6kacpvqrrhw')
//     .then(info => console.log(info))
//     .catch(err => console.error(err));

let invoice = new lndClient.Invoice();
invoice.value = 1000;
lndClient.addInvoice(invoice)
    .then(info => console.log(info))
    .catch(err => console.error(err));