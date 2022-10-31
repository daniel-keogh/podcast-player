/* eslint-disable no-undef */
const path = require("path");
const webpack = require("webpack");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    devtool: "source-map",
    plugins: {
      add: [
        new webpack.DefinePlugin({
          process: { env: {} },
        }),
      ],
    },
  },
};
