const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const { fixupConfigRules } = require('@eslint/compat');
const tseslint = require('typescript-eslint');
const baseConfig = require('../../eslint.config.cjs');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = tseslint.config(
  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [...tseslint.configs.recommended],
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    ignores: ['.next/**/*', 'next-env.d.ts', '**/*.cjs', '**/*.mjs', 'next.config.*', 'jest.config.*', 'webpack.config.*'],
  },
);
