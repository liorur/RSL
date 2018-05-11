const lndClient = require('./client/lib/lnd-client');

// lndClient.getInfo()
//     .then(info => console.log(info))
//     .catch(err => console.error(err));
//
// lndClient.listPeers()
//     .then(info => console.log(info))
//     .catch(err => console.error(err));
//
// lndClient.listChannels(new lndClient.ListChannelsRequest())
//     .then(info => console.log(info))
//     .catch(err => console.error(err));

// lndClient.sendPayment('lntb150u1pd025hppp5uw4q3adkd2the89ygvqgcwm2f4grjxjtxhm8v6yjpnx8gddhmefqdqqcqzysjjrfa04zea4a8nxce43tfzzk5ed2e7uapnghx3c7l4jkyfc7xsg9xypr5u45e69sp5n3d20gt8qvagph7fak0z3prsyk0n646hqpsggq3l3h8c')
//     .then(info => console.log(info))
//     .catch(err => console.error(err));

// let invoice = new lndClient.Invoice();
// invoice.value = 1000;
// lndClient.addInvoice(invoice)
//     .then(info => console.log(info))
//     .catch(err => console.error(err));

lndClient.listInvoices({payment_request: 'lntb150u1pd025hppp5uw4q3adkd2the89ygvqgcwm2f4grjxjtxhm8v6yjpnx8gddhmefqdqqcqzysjjrfa04zea4a8nxce43tfzzk5ed2e7uapnghx3c7l4jkyfc7xsg9xypr5u45e69sp5n3d20gt8qvagph7fak0z3prsyk0n646hqpsggq3l3h8c'})
    .then(info => console.log(info))
    .catch(err => console.error(err));

// lndClient.isInvoiceSettled({payment_request: 'lntb10u1pd022vupp54tgf2pc4rqwpkc55zeuzgckr9udgw5hjqcunsgq2nalcy5yc2y0qdqqcqzyst9c46072qle27t67vqycqm60s60udu8d5jj4mf7yvmljrandf6kp9gach7je42vu3zve4qyz9yjk7e20w3z07dq680qfyjlastxfzvspg3zj2q'})
//     .then(info => console.log(info))
//     .catch(err => console.error(err));