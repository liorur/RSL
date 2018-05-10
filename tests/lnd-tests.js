const lndClient = require('../client/lib/lnd-client');

lndClient.getInfo()
    .then(info => console.log(info))
    .catch(err => console.error(err));

lndClient.listPeers()
    .then(info => console.log(info))
    .catch(err => console.error(err));