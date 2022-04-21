module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
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
  ignorePatterns: ['**/venv/*, **/*.test.*, **/*.spec.*']
};
