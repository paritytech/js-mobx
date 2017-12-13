# js-mobx

Repo for all Mobx stores used across dapps & plugins

## List of stores

| Store                 | Description                                          |
| --------------------- | ---------------------------------------------------- |
| DappsDisplayStore     | Display information of dapps (visibility, pinned...) |
| DappsPermissionsStore | Method permissions for dapps                         |
| DappsStore            | List of all dapps with info                          |
| HardwareStore         | Hardware wallets                                     |
| SignerStore           | Signer requests                                      |

# Folder structure

This repo tries to follow the structure described in `./src/methodGroups.js`.

| Folder    | Method Groups                   | Stores                                                   |
| --------- | ------------------------------- | -------------------------------------------------------- |
| accounts/ | accounts<br>accountsEdit        | HardwareStore                                            |
| dapps/    | dapps<br>dappsEdit              | DappsStore<br>DappsDisplayStore<br>DappsPermissionsStore |
| signer/   | signerConfirm<br>signerRequests | SignerStore                                              |
