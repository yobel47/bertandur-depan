/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tandur: "#7CBD1E",
        "font-primary": "#7A7A7A",
      },
    },
    fontFamily: {
      body: ["Poppins-Regular"],
      poppins: ["Poppins-Regular"],
      poppinsLight: ["Poppins-Light"],
      poppinsBold: ["Poppins-Bold"],
      poppinsSemibold: ["Poppins-Semibold"],
      poppinsMedium: ["Poppins-Medium"],
    },
  },
  plugins: [],
};
