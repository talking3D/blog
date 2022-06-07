const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
     'even-darker': '#231F20', 
    },
    extend: {
      spacing: {
        '22.5': '5.625rem',
      },
      fontFamily: {
        'sans': ['Montserrat', defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}
