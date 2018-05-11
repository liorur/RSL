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

// lndClient.sendPayment('lntb11110n1pd02tc2pp5w0md59vg6jsqm5ulavvr8wtkn232en305gc8fej7edfakjz3ucdqdqqcqzys0uevkkl7njyj9d80ccpe0ftce3hyvnnpmvj6zthx5n6tvn56xg8887e8z75wagfpj92d5rdyn89fx0q8pm985kh2eyrc2c9fp0fs48cp54gc86')
//     .then(info => console.log(info))
//     .catch(err => console.error(err));

// let invoice = new lndClient.Invoice();
// invoice.value = 1000;
// lndClient.addInvoice(invoice)
//     .then(info => console.log(info))
//     .catch(err => console.error(err));

lndClient.listInvoices({settled: false})
    .then(info => console.log(info))
    .catch(err => console.error(err));