/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: ['/node_modules'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
};