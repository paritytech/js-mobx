# js-mobx

Repo for all Mobx stores used across dapps

## List of stores

| Store                   | Description                                       |
| ----------------------- | ------------------------------------------------- |
| `dappsStore`            | List of all dapps                                 |
| `dappsDisplayStore`     | Display information of dapps (visibility, pinned) |
| `dappsPermissionsStore` | Method permissions of dapps                       |

# Folder structure

The stores are grouped into folders relative to a method group, as described in `./src/methodGroups.js`.

| Folder  | Method Groups        | Stores                                                    |
| ------- | -------------------- | --------------------------------------------------------- |
| `dapps` | `dapps`, `dappsEdit` | `DappsStore`, `DappsDisplayStore`,`DappsPermissionsStore` |
