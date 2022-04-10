/* eslint-disable sort-keys */
const defaultTheme = require('tailwindcss/defaultTheme');
const forms = require('@tailwindcss/forms');

module.exports = {
  content: [
    './index.html',
    './admin/index.html',
    './src/entries/*.tsx',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [forms],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Myriad', ...defaultTheme.fontFamily.sans],
        display: ['Avenir', ...defaultTheme.fontFamily.sans],
        body: ['Myriad', ...defaultTheme.fontFamily.sans],
      },
    },
    fontSize: {
      xs: ['1.2rem', '1.6rem'],
      sm: ['1.4rem', '2rem'],
      base: ['1.6rem', '2.4rem'],
      lg: ['1.8rem', '2.8rem'],
      xl: ['2rem', '2.8rem'],
      '2xl': ['2.4rem', '3.2rem'],
      '3xl': ['3rem', '3.6rem'],
      '4xl': ['3.6rem', '4rem'],
      '5xl': '4.8rem',
      '6xl': '6rem',
      '7xl': '7.2rem',
      '8xl': '9.6rem',
      '9xl': '12.8rem',
    },
  },
};
