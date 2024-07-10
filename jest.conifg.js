module.exports = {
    preset: 'react-native',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
    },
    testMatch: [
      '**/__tests__/**/*.test.ts',
      '**/__tests__/**/*.test.tsx',
    ],
  };