module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    'prettier',
    'plugin:storybook/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/button-has-type': 'error',
    'react/prop-types': 'error',
    'react/require-default-props': 'error',
    'react/no-array-index-key': 'error',
    'react/display-name': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger-with-children': 'error',
    'react/jsx-no-bind': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off', // TODO: fix
  },
}
