/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '4xl': '0 55px 100px -12px rgba(0, 0, 0, 0.5)',
        '3xl': '0 33px 75px -12px rgba(0, 0, 0, 0.33)',
      },
    },
  },
  plugins: [],
}

