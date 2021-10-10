const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
      main: './index.js',
  },
  output: {
    filename: '[name].[contenthash:8].js',
    assetModuleFilename: '[path][name].[hash:8][ext]',
    path:path.resolve(__dirname, "build"),
    publicPath: '/',
    clean: true
  },
  devServer: {
    static: './build',
    host: "0.0.0.0",
    port: "8080",
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
      favicon: "./static/favicon.ico"
    }),
    new webpack.EnvironmentPlugin(['WORDBREW_API_URL']),
    new MiniCssExtractPlugin({
        filename: "style.[contenthash:8].css"
    })
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
        ],
      },
      {
        test: /\.(scss)$/,
        use: [{
          // extract css to minified file
          loader: MiniCssExtractPlugin.loader
        }, {
          // translates CSS into CommonJS modules
          loader: 'css-loader'
        }, {
          // Run postcss actions
          loader: 'postcss-loader',
          options: {
            // `postcssOptions` is needed for postcss 8.x;
            // if you use postcss 7.x skip the key
            postcssOptions: {
              // postcss plugins, can be exported to postcss.config.js
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          }
        }, {
          // compiles Sass to CSS
          loader: 'sass-loader'
        }]
      }
    ]
  }
};