const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      pale: "#ECCEAE",
      darkapricot: "#E68369",
      apricot: "#F8C2A6",
      greentea: "#C9E5AB",
    },
    extend: {},
  },
  plugins: [],
});
