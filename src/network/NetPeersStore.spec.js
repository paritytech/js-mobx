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

/* eslint-env jest */

import { toJS } from 'mobx';

import NetPeersStore from './NetPeersStore';

const mockApi = {
  pubsub: {
    parity: { netPeers: () => {} }
  },
  parity: {
    acceptNonReservedPeers: jest.fn(),
    addReservedPeer: jest.fn(),
    dropNonReservedPeers: jest.fn(),
    removeReservedPeer: jest.fn()
  }
};

test('should handle realPeers when netPeers is not set', () => {
  const store = NetPeersStore.get(mockApi);

  expect(toJS(store.realPeers)).toEqual([]);
});

test('should handle realPeers correctly', () => {
  const store = NetPeersStore.get(mockApi);
  const realPeers = [
    {
      id: '4',
      network: { remoteAddress: 'Foo' },
      protocols: {
        eth: {
          head: 'Foo'
        }
      }
    },
    {
      id: '5',
      network: { remoteAddress: 'Foo' },
      protocols: {
        eth: {
          head: 'Bar'
        }
      }
    }
  ];
  store.setNetPeers({
    peers: [
      { id: null }, // To be removed because no id
      { id: '1', network: { remoteAddress: 'Handshake' } }, // To be removed because handshake
      { id: '2', network: { remoteAddress: 'Foo' }, protocols: {} }, // To be removed because no protocols.eth
      {
        id: '3', // To be removed because no protocol.eth.head
        network: { remoteAddress: 'Handshake' },
        protocols: { eth: {} }
      },
      ...realPeers.slice().reverse() // Setting in reverse to test sort
    ]
  });

  expect(toJS(store.realPeers)).toEqual(realPeers);
});

test('should handle acceptNonReservedPeers', () => {
  const store = NetPeersStore.get(mockApi);
  store.acceptNonReservedPeers();

  expect(mockApi.parity.acceptNonReservedPeers).toHaveBeenCalledWith();
});

test('should handle addReservedPeer', () => {
  const store = NetPeersStore.get(mockApi);
  store.addReservedPeer('Foo');

  expect(mockApi.parity.addReservedPeer).toHaveBeenCalledWith('Foo');
});

test('should handle dropNonReservedPeers', () => {
  const store = NetPeersStore.get(mockApi);
  store.dropNonReservedPeers();

  expect(mockApi.parity.dropNonReservedPeers).toHaveBeenCalledWith();
});

test('should handle removeReservedPeer', () => {
  const store = NetPeersStore.get(mockApi);
  store.removeReservedPeer('Foo');

  expect(mockApi.parity.removeReservedPeer).toHaveBeenCalledWith('Foo');
});
