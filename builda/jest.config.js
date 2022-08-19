/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  silent: true,
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/examples/', '<rootDir>/.builda/'],
  moduleNameMapper: {
    "@scaffold/(.*)": "<rootDir>/src/scaffold/$1",
    "@scripts/(.*)": "<rootDir>/src/scripts/$1",
    "@scripts": "<rootDir>/src/scripts/index.ts",
    "@typedefs/(.*)": "<rootDir>/src/types/$1",
    "@data/(.*)": "<rootDir>/src/data/$1",
    "@helpers/(.*)": "<rootDir>/src/helpers/$1",
    "@helpers": "<rootDir>/src/helpers/index.ts",
    "@mocks/(.*)": "<rootDir>/src/mocks/$1",
  }
};
