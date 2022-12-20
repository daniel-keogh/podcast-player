/* eslint-disable no-undef */
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    devtool: "source-map",
  },
};
