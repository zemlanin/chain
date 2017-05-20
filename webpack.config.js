const path = require("path");
const webpack = require("webpack");

module.exports = env => {
  return {
    entry: "./index.jsx",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.js"
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: {
            loader: "babel-loader",
            options: {
              presets: ["preact"]
            }
          },
          exclude: /node_modules/
        }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      hot: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ]
  };
};
