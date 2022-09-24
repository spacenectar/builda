/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  rootDir: './',
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  silent: false,
  maxWorkers: 1,
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/example/',  '<rootDir>/.builda/'],
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
