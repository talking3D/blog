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
        '19': '4.75rem',
        '22.5': '5.625rem',
        '29': '7.25rem',
        '30': '8rem',
        '42': '10.5rem',
        '62': '15.5rem',
        '77': '19.25rem',
        '100': '25rem',
        '158': '39.5rem',
        '200': '50rem',
      },
      fontFamily: {
        'sans': ['Montserrat', defaultTheme.fontFamily.sans],
        'roboto': ['Roboto', 'sans-serif'],
      },
      screens: {
        'mini': '459px',
      },
      maxWidth: {
        'tall': '308px',
        'medium': '390px',
        'long': '632px',
      },
      lineHeight: {
        'a-little-bit-looser': '1.875rem'
      }
    },
  },
  plugins: [],
}
