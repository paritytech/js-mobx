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

export default class DappsUrlStore {
  @observable dappsUrl;

  constructor(api) {
    this._api = api;

    this.loadUrl();
  }

  static get(api) {
    if (!instance) {
      instance = new DappsUrlStore(api);
    }

    return instance;
  }

  setUrl = action(url => {
    this.dappsUrl = url;
  });

  loadUrl = () => this._api.parity.dappsUrl().then(this.setUrl);
}
