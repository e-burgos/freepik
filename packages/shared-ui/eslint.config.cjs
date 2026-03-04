const tseslint = require('typescript-eslint');
const baseConfig = require('../../eslint.config.cjs');

module.exports = tseslint.config(
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [...tseslint.configs.recommended],
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  {
    ignores: ['**/*.cjs', '**/*.mjs'],
  },
);
