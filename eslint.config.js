import reactConfig from 'abruno-dev-config/eslint/react';

const eslintConfig = [
  ...reactConfig,
  {
    rules: {
      'import/no-default-export': 'off',
      'max-lines-per-function': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'react/jsx-no-bind': [
        'warn',
        { ignoreRefs: true, allowArrowFunctions: true },
      ],
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      '*.config.js',
      '*.config.ts',
    ],
  },
];

export default eslintConfig;
