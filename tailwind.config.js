const colors = require("tailwindcss/colors");

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: false, // or 'media' or 'class'
  purge: {
    enabled: process.env.NODE_ENV === "production",
    safeList: [],
    content: ["./index.html", "./src/**/*.tsx", "./src/**/*.ts"],
  },
  theme: {
    colors: {
      ...colors,
      mixyboos: "#E734AE",
      mixyboosLight: "#de73bc",
    },
    extend: {
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: ["responsive", "hover"],
  plugins: [require("@tailwindcss/line-clamp")],
};
