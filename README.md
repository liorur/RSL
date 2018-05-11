# A decentralized lightning settlement for FIAT hedging

This poc demonstrates one channel, but this channel can be extended to a whole network.
The framework this network can be built around a decentralized trustless contract.

The contract is a ‘match maker’, which sells ‘connections’ it matches alice and bob to both sides of the channel, unaware of the channel the matchmaker only counts connections.
it’s a mechanism that creates a value proposition
it solves the ‘one time deal’ problem in which each side tries to maximize it’s earnings.

You pay to get into the system and get set amount of ‘connections’ (val=x) in a block, so now the sides have a basic value that they wish to protect.
Each user is suggested a connection and a match is made, 
If bob refuses to pay the micro settlement, alice will ask for a new connection to step into the same ‘instance’
An instance is defined as the tick (t=0,1,2,3,4...r) of the ticker output 
In that same instance Alice still expects a payment, an honest player who paid for the connection will not want to lose the connection value and pay Alice, a player like Bob which refuses payment is matched to a new partner with same instance and needs to pay up or disconnect again.
The logical conclusion is that dishonest players pay more connections and are pushed out of the network.
In the meantime a price discovery mechanism is created.

This network is capable of being a decentralized contract running on rootstock or ether
It does not need to monitor price quotes, but by proxy, it allows a lightning fast 
price discovery mechanism and a useful tool to create a ‘stable fiat’ hedge.
