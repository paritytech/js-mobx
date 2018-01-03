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

import { extendObservable } from 'mobx';

import createMobxStore from '../utils/createMobxStore';

export const STATUS_OK = 'ok';
export const STATUS_WARN = 'needsAttention';
export const STATUS_BAD = 'bad';

const instance = createMobxStore('parity_nodeHealth', {
  variableName: 'health',
  defaultValue: {}
});

extendObservable(instance, {
  /**
   * Get overall health of node
   */
  get overall () {
    if (!this.health || !Object.keys(this.health).length) {
      return {
        status: STATUS_BAD,
        message: ['Unable to fetch node health.']
      };
    }

    // Find out if there are bad statuses
    const bad = Object.values(this.health)
      .filter(x => x)
      .map(({ status }) => status)
      .find(s => s === STATUS_BAD);
    // Find out if there are needsAttention statuses
    const needsAttention = Object.keys(this.health)
      .filter(key => key !== 'time')
      .map(key => this.health[key])
      .filter(x => x)
      .map(({ status }) => status)
      .find(s => s === STATUS_WARN);
    // Get all non-empty messages from all statuses
    const message = Object.values(this.health)
      .map(({ message }) => message)
      .filter(x => x);

    return {
      status: bad || needsAttention || STATUS_OK,
      message
    };
  }
});

export default instance;
