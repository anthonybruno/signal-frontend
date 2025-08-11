import reactConfig from 'abruno-dev-config/eslint/react';
import prettier from 'eslint-config-prettier';
import pluginNext from '@next/eslint-plugin-next';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default [
  ...reactConfig,
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/coverage/**',
      '**/*.config.js',
      '**/postcss.config.js',
      'next-env.d.ts',
    ],
  },
  {
    plugins: { '@next/next': pluginNext },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      'max-lines-per-function': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'react/jsx-no-bind': 'off',
    },
  },
  prettier,
];
