module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:jest-dom/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
    'plugin:@next/next/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: {
        browser: true
      },
      extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
      ]
    },
    {
      files: ['**/*.json'],
      extends: ['plugin:json/recommended']
    }
  ],
  env: {
    browser: true,
    node: true
  },
  ignorePatterns: [
    '**/venv/*, **/*.test.*, **/*.spec.*',
    '**/.builda/**',
    '**/scaffolds/**'
  ],
  rules: {
    'react/prop-types': [
      2,
      {
        ignore: ['children']
      }
    ],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
  }
};
