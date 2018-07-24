const path = require('path');

module.exports = {
  context: __dirname,
  entry: "./js/main.js",
  output: {
    path: path.resolve(__dirname),
    filename: "./js/game_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['env', 'react']
          }
        },
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
