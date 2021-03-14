const { CleanWebpackPlugin  } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './desarrollo/index.js',
  output: 
  {
    path: path.resolve(__dirname, '../produccion'),
    filename: '[name].[contenthash].js',
    publicPath: ''
  },
  module: 
  {
    rules: 
    [
      {
        use: 'babel-loader',
        test: /.(js|jsx)$/,
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        type: 'asset',
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
      },
    ],
  },
  resolve:
  {
    extensions: ['.js','.jsx', '.json']
  },
  plugins: 
  [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin
    (
     {
      template: './desarrollo/index.pug',
     }
    )
  ]
}
