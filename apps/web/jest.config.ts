import type { Config } from 'jest';
import nextJest from 'next/jest.js';
import path from 'path';

const createJestConfig = nextJest({
  dir: path.resolve(__dirname),
});

const config: Config = {
  displayName: 'web',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/web',
  testEnvironment: 'jsdom',
};

export default createJestConfig(config);
