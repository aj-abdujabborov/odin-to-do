const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  output: {
    clean: true,
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: ">0.25%, not dead" }]], // browser must have >0.25% of market share
          },
        },
      },
    ],
  },
  // devtool: 'source-map',
});
