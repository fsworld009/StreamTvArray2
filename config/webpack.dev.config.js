const path = require('path');
const webpack = require('webpack');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorWebpackPlugin = require('friendly-errors-webpack-plugin');

const getConfig = require('./webpack.base.config.js');

const srcPath = path.resolve(__dirname, '../src');
const distPath = path.resolve(__dirname, '../dist/dev');


const config = getConfig({
  mode: 'development',
  entry: {
    index: [path.resolve(srcPath, 'index.js')],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  output: {
    path: distPath,
    publicPath: './',
    filename: '[name].js',
    chunkFilename: 'bundle/[id].chunk.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(srcPath, 'index.html'),
    }),
    new FriendlyErrorWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['App running at http://localhost:3000'],
      },
    }),
  ],
});

config.devServer = {
  hot: true,
  inline: true,
  clientLogLevel: 'none', // prevent HMR messages spamming browser console
  compress: true,
  overlay: {
    warnings: false,
    errors: true,
  },
  contentBase: path.resolve(__dirname, '../dist/dev/'),
  publicPath: '/',
  port: 3000,
  quiet: true, // required for friendly error plugin
};

module.exports = config;
