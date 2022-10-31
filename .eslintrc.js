module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:storybook/recommended'],
  ignorePatterns: ['**/node_modules/**'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 2,
    'brace-style': ['error', 'stroustrup', {
      allowSingleLine: true
    }],
    camelcase: ['error', {
      ignoreDestructuring: true,
      properties: 'never'
    }],
    'comma-dangle': 'off',
    'consistent-return': 'off',
    'import/extensions': 'off',
    'import/no-amd': 'warn',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': 'warn',
    'jsx-a11y/label-has-associated-control': ['error', {
      required: {
        some: ['nesting', 'id']
      }
    }],
    'jsx-a11y/label-has-for': ['error', {
      required: {
        some: ['nesting', 'id']
      }
    }],
    'lines-between-class-members': ['error', 'never'],
    'max-len': ['warn', {
      code: 120
    }],
    'no-console': 'warn',
    'no-mixed-operators': 'warn',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-restricted-globals': 'off',
    'no-undef': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'object-curly-newline': 'off',
    'object-shorthand': 'off',
    'operator-linebreak': ['error', 'after'],
    'prefer-arrow-callback': 'warn',
    'prefer-destructuring': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': [1, {
      extensions: ['.jsx', '.tsx']
    }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-danger': 'off',
    'react/no-did-mount-set-state': 'off',
    // https://github.com/airbnb/javascript/issues/684
    'react/no-unstable-nested-components': ['off', {
      allowAsProps: true
    }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/sort-comp': 'warn',
    'react/static-property-placement': 'warn',
    'sort-keys': ['warn', 'asc'],
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      asyncArrow: 'always',
      named: 'never'
    }],
    'spaced-comment': 'warn'
  }
};