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
const mockApi = {
  pubsub: {
    parity: {
      nodeHealth: () => {}
    }
  }
};

test('should handle overall without health', () => {
  const store = NodeHealthStore.get(mockApi);
  store.setHealth({});

  expect(store.overall).toEqual({
    status: STATUS_BAD,
    message: ['Unable to fetch node health.']
  });
});

test('should handle overall bad', () => {
  const store = NodeHealthStore.get(mockApi);
  store.setHealth({ time: mockHealth.time });

  expect(store.overall).toEqual({ status: STATUS_BAD, message: ['bad'] });
});

test('should handle overall needsAttention', () => {
  const store = NodeHealthStore.get(mockApi);
  store.setHealth({ sync: mockHealth.sync });

  expect(store.overall).toEqual({
    status: STATUS_WARN,
    message: ['not synced']
  });
});

test('should handle overall ok', () => {
  const store = NodeHealthStore.get(mockApi);
  store.setHealth({ peers: mockHealth.peers });

  expect(store.overall).toEqual({ status: STATUS_OK, message: [] });
});
