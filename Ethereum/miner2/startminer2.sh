#!/bin/bash

geth --identity "miner2" --networkid 42 --datadir "/Volumes/Storage/Ethereum/miner2" --nodiscover --mine --rpc --rpcport "8043" --rpcapi "db,eth,net,web3,miner" --port "30304" --unlock 0 --password /Volumes/Storage/Ethereum/miner1/password.sec