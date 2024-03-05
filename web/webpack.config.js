const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  devtool: "inline-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // Injects CSS into the DOM via a <style> tag
          "css-loader", // Turns CSS into CommonJS modules
          "sass-loader", // Compiles Sass to CSS
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Hello World",
      template: "./index.html",
    }),
  ],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    allowedHosts: "all",
    static: path.join(__dirname, "dist"),
    compress: true,
    host: "0.0.0.0",
    client: {
      overlay: false,
    },
    server: {
      type: "http",
      options: {},
    },
  },
};
