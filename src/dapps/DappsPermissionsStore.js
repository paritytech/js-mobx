// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import { action, observable } from 'mobx';

// Setting up block level variable to enforce singleton store
let instance = null;

export default class DappsPermissionsStore {
  @observable permissions = {};

  constructor(api) {
    if (!instance) {
      this._api = api;
      instance = this;
      this.loadPermissions();
    }

    return instance;
  }

  /**
   * Create an id to identify permissions based on method and appId
   */
  static getPermissionId = (method, appId) => `${method}:${appId}`;

  setPermissions = permissions => {
    this.permissions = permissions;
  };

  addAppPermission = action((method, appId) => {
    const id = DappsPermissionsStore.getPermissionId(method, appId);
    return this.savePermissions({ [id]: true });
  });

  removeAppPermission = action((method, appId) => {
    const id = DappsPermissionsStore.getPermissionId(method, appId);
    return this.savePermissions({ [id]: true });
  });

  hasAppPermission = (method, appId) =>
    !!this.permissions[DappsPermissionsStore.getPermissionId(method, appId)];

  loadPermissions = () =>
    this._api.shell.getMethodPermissions().then(this.setPermissions);

  savePermissions = permissions =>
    this._api.shell.setMethodPermissions(permissions).then(
      // Load all permissions again after saving. It's overkill, as most of the
      // time only the recently toggled permission will differ. However,
      // it may happen the there's a shell_setMethodPermissions request for
      // dapp-dapp-methods, which will not be taken into account if we only
      // toggled this.permissions[permissionId].
      this.loadPermissions
    );
}
