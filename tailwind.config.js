/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cherry-red': '#E41D2A',
        'cherry-light': '#F24C57',
        'cherry-dark': '#B3151F',
        'stem-green': '#4CBB17',
        'stem-light': '#60D928',
        'stem-dark': '#3A8F12',
      },
      boxShadow: {
        'cherry': '0 0 20px rgba(228, 29, 42, 0.3)',
        'cherry-active': '0 0 50px rgba(228, 29, 42, 0.6)',
        'health': '0 0 20px rgba(0, 191, 165, 0.3)',
        'health-active': '0 0 50px rgba(0, 191, 165, 0.6)',
      },
      animation: {
        'float': 'float 8s infinite ease-in-out',
        'liquid-wave': 'liquid-wave 5s infinite alternate ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-20px) rotate(5deg)' },
          '50%': { transform: 'translateY(0) rotate(-2deg)' },
          '75%': { transform: 'translateY(15px) rotate(3deg)' },
        },
        'liquid-wave': {
          '0%': {
            transform: 'translateY(10%) scale(1.1, 0.9)',
            borderTopLeftRadius: '60%',
            borderTopRightRadius: '80%',
          },
          '50%': {
            transform: 'translateY(0%) scale(1, 1)',
            borderTopLeftRadius: '40%',
            borderTopRightRadius: '40%',
          },
          '100%': {
            transform: 'translateY(10%) scale(0.9, 1.1)',
            borderTopLeftRadius: '80%',
            borderTopRightRadius: '60%',
          },
        },
      },
    },
  },
  plugins: [],
};