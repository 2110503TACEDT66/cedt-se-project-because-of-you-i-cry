/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins : [ 'Poppins', 'sans-serif'],
        poppins2 : ['Poppins2', 'sans-serif'],
        inter : ['Inter', 'sans-serif']
      },
    },
  },
  plugins: [],
}

