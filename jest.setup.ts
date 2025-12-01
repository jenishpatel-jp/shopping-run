import '@testing-library/jest-native/extend-expect';
import React from 'react';

// jest.mock('expo-router', () => ({

jest.mock('expo-router', () => ({
  useRouter: () => ({
    back: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  }),
  Stack: {
    Screen: ({ children }: any) => children,
  },
}));

// Mock Colour Scheme
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  default: () => 'light',
}));

// Mock store database hooks
jest.mock('./lib/store', () => ({
  useStoreDatabase: () => ({
    addStore: jest.fn(),
    fetchStores: jest.fn().mockResolvedValue([]),
  }),
}));

// Mock Legend State
jest.mock('./lib/state', () => ({
  state$: {
    stores: {
      get: () => [],
      set: jest.fn(),
    },
  },
}));

// jMock SQLite for testing
jest.mock('expo-sqlite', () => ({
  openDatabase: jest.fn(() => ({
    transaction: jest.fn((cb) => cb({ executeSql: jest.fn() })),
  })),
  SQLiteProvider: ({ children }: any) => children, // render children
  useSQLiteContext: jest.fn(() => ({
    transaction: jest.fn((cb) => cb({ executeSql: jest.fn() })),
  })),
}));