/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // ✅ VERY IMPORTANT for Angular
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
