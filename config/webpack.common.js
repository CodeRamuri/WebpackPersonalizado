const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { CleanWebpackPlugin  } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './desarrollo/index.js',
  output: 
  {
    path: path.resolve(__dirname, '../produccion'),
    filename: '[name].[contenthash].js',
    publicPath: '',
    assetModuleFilename: 'asset/[name].webp'
  },
  module: 
  {
    rules: 
    [
      {
        use: 'babel-loader',
        test: /.(js)$/,
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        type: 'asset/resource',
        test: /\.(jpe?g|png|gif)$/i,
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: 
        [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              minimizerOptions: {
                plugins: 
                [
                  ['gifsicle', { interlaced: false }],
                  ['mozjpeg', { quality: 80 }],
                  [
                    'imagemin-svgo',
                    {
                      plugins: [
                        {
                          removeViewBox: false,
                        },
                      ],
                    },
                  ],
                  'pngquant',
                  'imagemin-webp'
                ],
              },
            },
          },
        ],
      },     
    ],
  },
  resolve:
  {
    extensions: ['.js','.json']
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
