# LND LIGHTNING readme


## LIGHTNING node

Install go and dep
```
brew install go
brew install dep
```

Add these to the ```.bash_profile```:
```
export GOPATH=~/gocode
export PATH=$PATH:$GOPATH/bin
```

Get LND (and run make install)
```
go get -d github.com/lightningnetwork/lnd
cd $GOPATH/src/github.com/lightningnetwork/lnd
make && make install
```

Test the install:
```
make check
```

Run:
```
lnd --bitcoin.active --bitcoin.testnet --debuglevel=debug --bitcoin.node=neutrino --neutrino.connect=faucet.lightning.community --no-macaroons -d=trace
```

## LIGHTNING client

Create a wallet:
```
lncli --rpcserver 127.0.0.1:10009 --no-macaroons create
```

Create a channel with faucet:
```
lncli --rpcserver 127.0.0.1:10009 --no-macaroons connect 0270685ca81a8e4d4d01beec5781f4cc924684072ae52c507f8ebe9daf0caaab7b@159.203.125.125
```

## Get funds from faucet

After doing all of the above, open a browser at [https://faucet.lightning.community](https://faucet.lightning.community) and send some satoshis to your node with the identity_pubkey.