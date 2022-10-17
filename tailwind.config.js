/* eslint-disable sort-keys */
const defaultTheme = require('tailwindcss/defaultTheme');
const forms = require('@tailwindcss/forms');

module.exports = {
  content: [
    './index.html',
    './admin/index.html',
    './src/entries/*.tsx',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/hooks/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [forms],
  theme: {
    extend: {
      colors: {
        'shoob-300': '#6ca5d3',
        'shoob-400': '#488fc9',
        'shoob-500': '#3883c0',
        'shoob-600': '#2f6fa3',
        'shoob-700': '#275b86',
      },
      fontFamily: {
        sans: ['Myriad', ...defaultTheme.fontFamily.sans],
        display: ['Avenir', ...defaultTheme.fontFamily.sans],
        body: ['Myriad', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
