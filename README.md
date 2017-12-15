# js-mobx

Repo for all Mobx stores used across dapps & plugins

## List of stores

| Store                 | Description                                          |
| --------------------- | ---------------------------------------------------- |
| DappsDisplayStore     | Display information of dapps (visibility, pinned...) |
| DappsPermissionsStore | Method permissions for dapps                         |
| DappsStore            | List of all dapps with info                          |
| DappsUrlStore         | Base url of dapps                                    |
| HardwareStore         | Hardware wallets                                     |
| SignerStore           | Signer requests                                      |

# Folder structure

This repo tries to follow the structure described in `./src/methodGroups.js`.

| Folder    | Method Groups                   | Stores                                                                 |
| --------- | ------------------------------- | ---------------------------------------------------------------------- |
| accounts/ | accounts<br>accountsEdit        | HardwareStore                                                          |
| dapps/    | dapps<br>dappsEdit              | DappsDisplayStore, DappsPermissionsStore,<br>DappsStore, DappsUrlStore |
| signer/   | signerConfirm<br>signerRequests | SignerStore                                                            |
