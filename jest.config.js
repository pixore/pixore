const TEST_REGEX = '(/__tests__/.*|(\\.|/)|spec)\\.(tsx?|ts?)$';

module.exports = {
  setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each'],
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  collectCoverage: true,
};
