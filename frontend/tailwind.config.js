/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007BFF',
        secondary: '#FF7F50',
        neutral: '#6C757D',
      }
    },
  },
  plugins: [require('tailwindcss-primeui')]
}

