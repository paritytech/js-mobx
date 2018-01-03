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

const instance = createMobxStore('parity_netPeers', {
  defaultValue: {}
});

extendObservable(instance, {
  /**
   * Get real network peers
   */
  get realPeers () {
    if (!this.netPeers.peers) return [];
    return this.netPeers.peers
      .filter(({ id }) => id)
      .filter(
        ({ network: { remoteAddress } }) => !/handshake/i.test(remoteAddress)
      )
      .filter(({ protocols: { eth } }) => eth && eth.head)
      .sort((peerA, peerB) => {
        return peerA.id.localeCompare(peerB.id);
      });
  },

  /**
   * Accept non-reserved peers
   */
  acceptNonReservedPeers: function () {
    return this._api.parity.acceptNonReservedPeers();
  },

  /**
   * Add reserved peers
   */
  addReservedPeer: function (enode) {
    return this._api.parity.addReservedPeer(enode);
  },

  /**
   * Drop non-reserved peers
   */
  dropNonReservedPeers: function () {
    return this._api.parity.dropNonReservedPeers();
  },

  /**
   * Remove reserved peers
   */
  removeReservedPeer: function (enode) {
    return this._api.parity.removeReservedPeer(enode);
  }
});

export default instance;
