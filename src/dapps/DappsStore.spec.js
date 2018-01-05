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

import DappsStore from './DappsStore';

const mockApps = [
  { id: '123', name: '123' },
  { id: '456', name: '456' },
  { id: '789', name: '789' }
];

const mockApi = {
  shell: {
    getApps: () => Promise.resolve(mockApps)
  }
};

test('should be a singleton store when using static get', () => {
  const store1 = DappsStore.get(mockApi);
  const store2 = DappsStore.get(mockApi);

  expect(store1).toBe(store2);
});

test('should handle setApps', () => {
  const store = new DappsStore(mockApi);
  store.setApps(mockApps);

  expect(store.apps).toHaveLength(3);
  expect(store.apps).toContainEqual(mockApps[0]);
  expect(store.apps).toContainEqual(mockApps[1]);
  expect(store.apps).toContainEqual(mockApps[2]);
});

test('should handle setError', () => {
  const store = new DappsStore(mockApi);
  store.setError({ message: 'SOME_ERROR' });

  expect(store.error).toEqual({ message: 'SOME_ERROR' });
});

test('should make api call when loadApps', () => {
  const getApps = jest.fn(() => Promise.resolve(mockApps));
  const store = new DappsStore({ shell: { getApps } });

  expect.assertions(5);
  return store.loadApps().then(() => {
    expect(getApps).toHaveBeenCalledWith(true);
    expect(store.apps).toHaveLength(3);
    expect(store.apps).toContainEqual(mockApps[0]);
    expect(store.apps).toContainEqual(mockApps[1]);
    expect(store.apps).toContainEqual(mockApps[2]);
  });
});
