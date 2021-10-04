const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".jsx", ".scss", ".js", ".json"],
    modules: [path.resolve(__dirname, "app"), "node_modules"],
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
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
