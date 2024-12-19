/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#F8FAFC",
          sky: "#D9EAFD",
          gray: "#BCCCDC",
          dark: "#9AA6B2",
      },
      screens: {
        "3xl": { max: "1600px" },
        "2xl": { max: "1440px" },
        xl: { max: "1200px" },
        lg: { max: "900px" },
        md: { max: "768px" },
        sm: { max: "600px" },
        xs: { max: "450px" },
      },
    },
  },
  plugins: [],
}