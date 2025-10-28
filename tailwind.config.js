/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'indian-orange': '#FF9933',
        'indian-green': '#138808',
      },
    },
  },
  plugins: [],
}
