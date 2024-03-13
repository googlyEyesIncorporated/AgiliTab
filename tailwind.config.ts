/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      width: {
        "3/10": "30%",
      },
      maxWidth: {
        "1/2": "50%",
      },
      fontSize: {
        double: "2rem",
      },
      padding: {
        "1/10": "10%",
      },
    },
  },
  plugins: [],
};
