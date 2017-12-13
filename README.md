# js-mobx

Repo for all Mobx stores used across dapps & plugins

## List of stores

| Store                   | Description                                       |
| ----------------------- | ------------------------------------------------- |
| `DappsStore`            | List of all dapps                                 |
| `DappsDisplayStore`     | Display information of dapps (visibility, pinned) |
| `DappsPermissionsStore` | Method permissions of dapps                       |
| `HardwareStore`         | Hardware wallets                                  |
| `UpgradeParityStore`    | Upgrade Parity node                               |

# Folder structure

The stores tries to follow the structure described in `./src/methodGroups.js`.

| Folder in this repo | Method Groups                | Stores                                                         |
| ------------------- | ---------------------------- | -------------------------------------------------------------- |
| `accounts`          | `accounts`<br>`accountsEdit` | `HardwareStore`                                                |
| `dapps`             | `dapps`<br>`dappsEdit`       | `DappsStore`<br>`DappsDisplayStore`<br>`DappsPermissionsStore` |
| `node`              | `node`<br>`nodeUpgrade`      | `UpgradeParityStore`                                           |
