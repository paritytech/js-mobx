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

let instance = null;

export default class DevLogsStore {
  @observable devLogs = [];
  @observable error = null;
  @observable parsedLogs = [];

  constructor (api) {
    this._api = api;

    this._api.pubsub.parity.devLogs((error, devLogs) => {
      this.setError(error);
      this.setDevLogs(devLogs); // Gets last 128 logs, unparsed
      this.addParsedLog(devLogs[0]); // Parse the most recent one, not using @computed to avoid parsing too much data
    });
  }

  static get (api) {
    if (!instance) {
      instance = new DevLogsStore(api);
    }

    return instance;
  }

  @action
  addParsedLog = log => {
    const parsedLog = /^(\d{4}.\d{2}.\d{2}.\d{2}.\d{2}.\d{2})(.*)$/i.exec(log); // Get the date inside the log
    if (!parsedLog) return;
    this.parsedLogs.replace(
      this.parsedLogs.concat({
        date: parsedLog[1],
        log: parsedLog[2]
      })
    );
  };

  @action
  setDevLogs = devLogs => {
    this.devLogs = devLogs;
  };

  @action
  setError = error => {
    this.error = error;
  };
}
