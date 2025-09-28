/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"), // <- correct plugin import
  ],
};