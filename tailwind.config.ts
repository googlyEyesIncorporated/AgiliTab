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
      minWidth: {
        "25vw": "25vw",
        "8": "2rem",
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
