const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       'even-darker': '#231F20',
       'cube-like': '#8CC63F',
      },
      borderWidth: {
        'thiner': '0.5px',
      },
      spacing: {
        '22.5': '5.625rem',
      },
      fontFamily: {
        'sans': ['Montserrat', defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
