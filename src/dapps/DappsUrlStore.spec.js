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

import DappsUrlStore from './DappsUrlStore';

const mockUrl = 'http://127.0.0.1:1234';
const mockError = { message: 'SOME_ERROR' };
const mockApi = {
  pubsub: {
    parity: {
      dappsUrl: () => {}
    }
  }
};

test('should be a singleton store when using static get', () => {
  const store1 = DappsUrlStore.get(mockApi);
  const store2 = DappsUrlStore.get(mockApi);

  expect(store1).toBe(store2);
});

test('should handle setUrl', () => {
  const store = new DappsUrlStore(mockApi);
  store.setUrl(mockUrl);

  expect(store.dappsUrl).toBe(mockUrl);
});

test('should handle setUrl when url does not start with http://', () => {
  const store = new DappsUrlStore(mockApi);
  const partialUrl = '127.0.0.1:1234';
  // Manually define window.location.protocol to http:
  // https://github.com/facebook/jest/issues/890#issuecomment-209698782
  Object.defineProperty(window.location, 'protocol', {
    writable: true,
    value: 'http:'
  });
  store.setUrl(partialUrl);

  expect(store.dappsUrl).toBe(mockUrl);
});

test('should handle setError', () => {
  const store = new DappsUrlStore(mockApi);
  store.setError(mockError);

  expect(store.error).toEqual(mockError);
});

test('should set url when pubsub publishes', () => {
  const mockPubSub = callback => {
    setTimeout(() => callback(null, mockUrl), 200); // Simulate pubsub with a 200ms timeout
  };
  const store = new DappsUrlStore({
    pubsub: {
      parity: { dappsUrl: mockPubSub }
    }
  });

  expect.assertions(1);
  return new Promise(resolve => setTimeout(resolve, 200)).then(() => {
    expect(store.dappsUrl).toBe(mockUrl);
  });
});

test('should set error when pubsub throws error', () => {
  const mockPubSub = callback => {
    setTimeout(() => callback(mockError, null), 200); // Simulate pubsub with a 200ms timeout
  };
  const store = new DappsUrlStore({
    pubsub: {
      parity: { dappsUrl: mockPubSub }
    }
  });

  expect.assertions(1);
  return new Promise(resolve => setTimeout(resolve, 200)).then(() => {
    expect(store.error).toEqual(mockError);
  });
});
