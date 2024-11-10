/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'laptop': '1256px',
      'desktop': '1700px'
    },
    extend: {
      fontFamily: {
        "readex_pro": ['"Readex Pro"', 'sans-serif'],
        'Tungsten': ['Tungsten-Bold', 'sans-serif'],
      },
      keyframes: {
        slide: {
          '0%' : { marginTop: '323.9px' }, 
          '100%': { marginTop: '0px' },
        }
      },
    }
  },
  plugins: [require("daisyui")],
}

