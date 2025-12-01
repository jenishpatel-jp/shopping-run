import '@testing-library/jest-native/extend-expect';
import { replace } from 'expo-router/build/global-state/routing';
import React from 'react';

//Mock Expo Router
jest.mock('expo-router', () => ({
    useRouter: () => () => ({
        back: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
    }),
    Stack: ({ children }: any) => children,
}));

// Mock Colour Scheme
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
    default: () => 'light',
}));

// Mock store database hooks
jest.mock('../lib/store', () => ({
    useStoreDatabase: () => ({
        addStore: jest.fn(),
        fetchStores: jest.fn().mockResolvedValue([]),
    }),
}));

// Mock Legend State
jest.mock('../lib/state', () => ({
    state$: {
        stores: {
            get: () => [],
            set: jest.fn(),
        },
    },

}));