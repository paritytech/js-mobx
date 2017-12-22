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

import DappsPermissionsStore from './DappsPermissionsStore';

const mockPermissions = { 'shell_loadApp:123': true };

const mockApi = {
  shell: {
    getMethodPermissions: () => Promise.resolve(mockPermissions),
    setMethodPermissions: () => Promise.resolve()
  }
};

test('should be a singleton store when using static get', () => {
  const store1 = DappsPermissionsStore.get(mockApi);
  const store2 = DappsPermissionsStore.get(mockApi);

  expect(store1).toBe(store2);
});

test('should handle setPermissions', () => {
  const store = new DappsPermissionsStore(mockApi);
  store.setPermissions(mockPermissions);

  expect(store.permissions).toEqual(mockPermissions);
});

test('should handle setError', () => {
  const store = new DappsPermissionsStore(mockApi);
  store.setError({ message: 'SOME_ERROR' });

  expect(store.error).toEqual({ message: 'SOME_ERROR' });
});

test('should handle hasAppPermission', () => {
  const store = new DappsPermissionsStore(mockApi);

  expect.assertions(3);
  return store.loadPermissions().then(() => {
    expect(store.hasAppPermission('shell_loadApp', '123')).toBe(true);
    expect(store.hasAppPermission('shell_loadApp', '456')).toBe(false);
    expect(store.hasAppPermission('parity_dappsRefresh', '123')).toBe(false);
  });
});

test('should call savePermissions when addAppPermission', () => {
  const savePermissions = jest.fn(() => Promise.resolve());
  const store = new DappsPermissionsStore(mockApi);
  store.savePermissions = savePermissions;
  store.addAppPermission('shell_loadApp', '456');

  expect(savePermissions).toHaveBeenCalledWith({ 'shell_loadApp:456': true });
});

test('should call savePermissions when removeAppPermission', () => {
  const savePermissions = jest.fn(() => Promise.resolve());
  const store = new DappsPermissionsStore(mockApi);
  store.savePermissions = savePermissions;
  store.removeAppPermission('shell_loadApp', '123');

  expect(savePermissions).toHaveBeenCalledWith({ 'shell_loadApp:123': false });
});

test('should make an api call when loadPermissions', () => {
  const getMethodPermissions = jest.fn(() => Promise.resolve(mockPermissions));
  const store = new DappsPermissionsStore({
    shell: { ...mockApi.shell, getMethodPermissions }
  });
  store.loadPermissions();

  expect(getMethodPermissions).toHaveBeenCalled();
});

test('should make an api call when savePermissions', () => {
  const setMethodPermissions = jest.fn(() => Promise.resolve());
  const store = new DappsPermissionsStore({
    shell: { ...mockApi.shell, setMethodPermissions }
  });
  store.savePermissions(mockPermissions);

  expect(setMethodPermissions).toHaveBeenCalledWith(mockPermissions);
});
