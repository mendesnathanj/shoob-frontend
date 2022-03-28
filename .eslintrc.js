module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "ignorePatterns": ["**/node_modules/**"],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
        'camelcase': ['error', { 'properties': 'never', 'ignoreDestructuring': true }],
        'comma-dangle': 'off',
        'import/extensions': 'off',
        'import/no-amd': 'warn',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'jsx-a11y/anchor-is-valid': 'warn',
        'jsx-a11y/label-has-for': [2, { 'required': { 'some': [ 'nesting', 'id' ]}}],
        'lines-between-class-members': 'error',
        'max-len': ['warn', { 'code': 120 }],
        'no-console': 'warn',
        'no-mixed-operators': 'warn',
        'no-param-reassign': 'warn',
        'no-plusplus': 'off',
        'no-restricted-globals': 'off',
        'no-undef': 'off',
        'no-underscore-dangle': 'off',
        'no-use-before-define': 'off',
        'object-shorthand': 'off',
        'object-curly-newline': 'off',
        'operator-linebreak': ['error', 'after'],
        'prefer-arrow-callback': 'warn',
        'prefer-destructuring': 'off',
        'react/destructuring-assignment': 'off',
        'react/jsx-filename-extension': [1, {
            'extensions': ['.jsx', '.tsx']
        }],
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/no-danger': 'off',
        'react/no-did-mount-set-state': 'off', // https://github.com/airbnb/javascript/issues/684
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        'react/static-property-placement': 'warn',
        'react/sort-comp': 'warn',
        'sort-keys': ['warn', 'asc'],
        'space-before-function-paren': ['error', {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'always'
        }],
        'spaced-comment': 'warn'
    }
}
