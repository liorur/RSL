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