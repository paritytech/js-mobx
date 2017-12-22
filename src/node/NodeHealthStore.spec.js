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

import NodeHealthStore, {
  STATUS_BAD,
  STATUS_OK,
  STATUS_WARN
} from './NodeHealthStore';

const mockHealth = {
  peers: { details: [], message: '', status: STATUS_OK },
  sync: { details: true, message: 'not synced', status: STATUS_WARN },
  time: { details: 234, message: 'bad', status: STATUS_BAD }
};
const mockError = { message: 'SOME_ERROR' };
const mockApi = {
  pubsub: {
    parity: {
      nodeHealth: () => {}
    }
  }
};

test('should be a singleton store when using static get', () => {
  const store1 = NodeHealthStore.get(mockApi);
  const store2 = NodeHealthStore.get(mockApi);

  expect(store1).toBe(store2);
});

test('should handle setHealth', () => {
  const store = new NodeHealthStore(mockApi);
  store.setHealth(mockHealth);

  expect(toJS(store.health)).toEqual(mockHealth);
});

test('should handle setError', () => {
  const store = new NodeHealthStore(mockApi);
  store.setError(mockError);

  expect(store.error).toEqual(mockError);
});

test('should handle overall without health', () => {
  const store = new NodeHealthStore(mockApi);
  store.setHealth({});

  expect(store.overall).toEqual({
    status: STATUS_BAD,
    message: ['Unable to fetch node health.']
  });
});

test('should handle overall bad', () => {
  const store = new NodeHealthStore(mockApi);
  store.setHealth({ time: mockHealth.time });

  expect(store.overall).toEqual({ status: STATUS_BAD, message: ['bad'] });
});

test('should handle overall needsAttention', () => {
  const store = new NodeHealthStore(mockApi);
  store.setHealth({ sync: mockHealth.sync });

  expect(store.overall).toEqual({
    status: STATUS_WARN,
    message: ['not synced']
  });
});

test('should handle overall ok', () => {
  const store = new NodeHealthStore(mockApi);
  store.setHealth({ peers: mockHealth.peers });

  expect(store.overall).toEqual({ status: STATUS_OK, message: [] });
});

test('should set url when pubsub publishes', () => {
  const mockPubSub = callback => {
    setTimeout(() => callback(null, mockHealth), 200); // Simulate pubsub with a 200ms timeout
  };
  const store = new NodeHealthStore({
    pubsub: {
      parity: { nodeHealth: mockPubSub }
    }
  });

  expect.assertions(1);
  return new Promise(resolve => setTimeout(resolve, 200)).then(() => {
    expect(toJS(store.health)).toEqual(mockHealth);
  });
});

test('should set error when pubsub throws error', () => {
  const mockPubSub = callback => {
    setTimeout(() => callback(mockError, null), 200); // Simulate pubsub with a 200ms timeout
  };
  const store = new NodeHealthStore({
    pubsub: {
      parity: { nodeHealth: mockPubSub }
    }
  });

  expect.assertions(1);
  return new Promise(resolve => setTimeout(resolve, 200)).then(() => {
    expect(store.error).toEqual(mockError);
  });
});
