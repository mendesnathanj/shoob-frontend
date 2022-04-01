const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './index.html',
    './admin/index.html',
    './src/entries/*.tsx',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Myriad', ...defaultTheme.fontFamily.sans],
        'display': ['Avenir', 'sans-serif', 'system-ui', '-apple-system'],
        'body': ['Myriad', 'sans-serif', 'system-ui', '-apple-system'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
