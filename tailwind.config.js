/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'rotate4 2s linear infinite',
        'dash-slow': 'dash4 1.5s ease-in-out infinite',
      },
      keyframes: {
        rotate4: {
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        dash4: {
          '0%': {
            strokeDasharray: '1, 200',
            strokeDashoffset: '0',
          },
          '50%': {
            strokeDasharray: '90, 200',
            strokeDashoffset: '-35px',
          },
          '100%': {
            strokeDashoffset: '-125px',
          },
        },
      },
    },
  },
  plugins: [],
};
