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
        '192': '48rem',
        '200': '50rem',
        '2/3': '66.6666%'
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
        'code-descr': 'calc(100%-200px)', 
      },
      lineHeight: {
        'a-little-bit-looser': '1.875rem'
      },
      flex: {
        '2': '2',
      },
      keyframes: {
        bumpup: {
         '0%': { transform: 'scale(1)' },
         '50%': { transform: 'scale(0.7)' },
         '100%': { transform: 'scale(1)'},
        },
        bumpdown: {
         '0%': { transform: 'scale(1)' },
         '50%': { transform: 'scale(0.85)' },
         '100%': { transform: 'scale(1)'},
        },
      },
      animation: {
        bumpup: 'bumpup 500ms linear',
        bumpdown: 'bumpdown 200ms linear',

      }
  },
},
  plugins: [],
}
