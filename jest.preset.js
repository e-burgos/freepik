const { workspaceRoot } = require('@nx/devkit');

module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': ['@swc-node/jest', { swc: { jsc: { target: 'es2022' } } }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  coverageReporters: ['html', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
