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

import createMobxStore from './createMobxStore';

// Mocks
const mockResult = {
  peers: { details: [], message: '' },
  sync: { details: true, message: 'not synced' },
  time: { details: 234, message: 'bad' }
};
const mockError = { message: 'SOME_ERROR' };
const mockJsonrpcMethod = 'parity_fakeVariable';
const mockApi = {
  pubsub: {
    parity: {
      fakeVariable: () => {} // Mock an API for parity_fakeVariable
    }
  }
};

test('should be a singleton store when using static get', () => {
  const baseStore = createMobxStore(mockJsonrpcMethod);
  const store1 = baseStore.get(mockApi);
  const store2 = baseStore.get(mockApi);

  expect(store1).toBe(store2);
});

test('should handle store options', () => {
  const store = createMobxStore(mockJsonrpcMethod, {
    variableName: 'foo',
    defaultValue: 'bar'
  }).get(mockApi);

  expect(store.foo).toBe('bar');
});

test('should handle setResult', () => {
  const store = createMobxStore(mockJsonrpcMethod).get(mockApi);
  store.setFakeVariable(mockResult);

  expect(toJS(store.fakeVariable)).toEqual(mockResult);
});

test('should handle setError', () => {
  const store = createMobxStore(mockJsonrpcMethod).get(mockApi);
  store.setError(mockError);

  expect(toJS(store.error)).toEqual(mockError);
});

test('should setResult when pubsub publishes', () => {
  const mockPubSub = callback => {
    setTimeout(() => callback(null, mockResult), 200); // Simulate pubsub with a 200ms timeout
  };
  const store = createMobxStore(mockJsonrpcMethod).get({
    pubsub: {
      parity: { fakeVariable: mockPubSub }
    }
  });

  expect.assertions(1);
  return new Promise(resolve => setTimeout(resolve, 200)).then(() => {
    expect(toJS(store.fakeVariable)).toEqual(mockResult);
  });
});

test('should setError when pubsub throws error', () => {
  const mockPubSub = callback => {
    setTimeout(() => callback(mockError, null), 200); // Simulate pubsub with a 200ms timeout
  };
  const store = createMobxStore(mockJsonrpcMethod).get({
    pubsub: {
      parity: { fakeVariable: mockPubSub }
    }
  });

  expect.assertions(1);
  return new Promise(resolve => setTimeout(resolve, 200)).then(() => {
    expect(store.error).toEqual(mockError);
  });
});
