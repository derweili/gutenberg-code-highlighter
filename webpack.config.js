const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Set different CSS extraction for editor only and common block styles
const filterCSSPlugin = new ExtractTextPlugin({
  filename: "./assets/css/filters.style.css"
});
const editFilterCSSPlugin = new ExtractTextPlugin({
  filename: "./assets/css/filters.editor.css"
});

// Configuration for the ExtractTextPlugin.
const extractConfig = {
  use: [
    { loader: "raw-loader" },
    {
      loader: "postcss-loader",
      options: {
        plugins: [require("autoprefixer")]
      }
    },
    {
      loader: "sass-loader",
      query: {
        outputStyle:
          "production" === process.env.NODE_ENV ? "compressed" : "nested"
      }
    }
  ]
};

module.exports = {
  entry: {
    "./assets/js/filters.editor": "./filters/index.js",
    "./assets/js/filters.frontend": "./filters/frontend.js"
  },
  output: {
    path: path.resolve(__dirname),
    filename: "[name].js"
  },
  externals: {
    "react" : "React",
    "react-dom": "ReactDOM"
  },
  watch: "production" !== process.env.NODE_ENV,
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /style\.s?css$/,
        use: filterCSSPlugin.extract(extractConfig)
      },
      {
        test: /editor\.s?css$/,
        use: editFilterCSSPlugin.extract(extractConfig)
      }
    ]
  },
  plugins: [filterCSSPlugin, editFilterCSSPlugin]
};
