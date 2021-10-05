const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".scss", ".js", ".jsx", ".json"],
    modules: [path.resolve(__dirname, "app"), "node_modules"],
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.(jsx)$/, use: "babel-loader" },
      { test: /\.(css)$/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.html",
    }),
  ],
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
};
