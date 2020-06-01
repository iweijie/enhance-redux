const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./lib"),
    filename: "index.js",
    library: "enhance-redux",
    libraryTarget: "umd",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /.+\.js/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      // ProvidePlugin 可以将模块作为一个变量，被webpack在其他每个模块中引用。只有你需要使用此变量的时候，这个模块才会被 require 进来。
      redux: ["redux"],
    }),
  ],
  externals: {
    redux: {
      // 可以在各模块系统(Commonjs/Commonjs2/AMD)中通过'lodash'访问，但在全局变量形式下用'_'访问
      commonjs: "redux",
      commonjs2: "redux",
      amd: "redux",
      root: "redux", // 指向全局变量
    },
  },
};
