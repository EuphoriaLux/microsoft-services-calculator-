/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'ms-blue': '#0078d4',
          'ms-dark-blue': '#106ebe',
          'ms-yellow': '#ffb900',
          'ms-text': '#323130',
          'ms-background': '#f3f2f1',
        },
        boxShadow: {
          'ms': '0 2px 6px rgba(0, 0, 0, 0.1)',
        },
        borderRadius: {
          'ms': '4px',
        }
      },
    },
    plugins: [],
  }