/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5', // Indigo-600
          light: '#6366f1',   // Indigo-500
          dark: '#4338ca',    // Indigo-700
        },
        secondary: {
          DEFAULT: '#ec4899', // Pink-500
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'soft-lg': '0 10px 15px -3px rgb(99 102 241 / 0.1), 0 4px 6px -4px rgb(99 102 241 / 0.1)',
      },
    },
  },
  plugins: [],
};
