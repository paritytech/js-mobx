# js-mobx

Repo for all Mobx stores used across dapps & plugins

## List of stores

This repo has one store per JSONRPC get/set method pair.

| JSONRPC Method (Get)            | JSONRPC Method (Set)                                                                                                        | Store                        |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `eth_accounts`                  |                                                                                                                             | eth/AccountsStore            |
| `eth_coinbase`                  | `parity_setAuthor`                                                                                                          | eth/CoinbaseStore            |
| `eth_hashrate`                  |                                                                                                                             | eth/HashrateStore            |
| `parity_chain`                  |                                                                                                                             | network/ChainStore           |
| `parity_dappsUrl`               |                                                                                                                             | dapps/DappsUrlStore          |
| `parity_defaultExtraData`       |                                                                                                                             | mining/DefaultExtraDataStore |
| `parity_devLogs`                |                                                                                                                             | other/DevLogsStore           |
| `parity_devLogsLevel`           |                                                                                                                             | other/DevLogsLevelStore      |
| `parity_enode`                  |                                                                                                                             | network/EnodeStore           |
| `parity_extraData`              | `parity_setExtraData`                                                                                                       | mining/ExtraDataStore        |
| `parity_gasFloorTarget`         | `parity_setGasFloorTarget`                                                                                                  | mining/GasFloorTargetStore   |
| `parity_getBlockHeaderByNumber` |                                                                                                                             | other/LatestBlockStore       |
| `parity_minGasPrice`            | `parity_setMinGasPrice`                                                                                                     | mining/MinGasPriceStore      |
| `parity_netPeers`               | `parity_acceptNonReservedPeers`<br>`parity_addReservedPeer`<br>`parity_dropNonReservedPeers`<br>`parity_removeReservedPeer` | network/NetPortStore         |
| `parity_netPort`                |                                                                                                                             | network/NetPeersStore        |
| `parity_nodeHealth`             |                                                                                                                             | network/NodeHealthStore      |
| `parity_rpcSettings`            |                                                                                                                             | network/RpcSettingsStore     |
| `shell_getApps`                 |                                                                                                                             | dapps/DappsStore             |
| `shell_getMethodPermissions`    | `shell_setMethodPermissions`                                                                                                | dapps/DappsPermissionsStore  |
