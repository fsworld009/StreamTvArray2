const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const FriendlyErrorWebpackPlugin = require('friendly-errors-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const config = {
  mode: 'development',
  entry: {
    index: [path.resolve(__dirname, '../src/index.js')],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  output: {
    path: path.resolve(__dirname, '../dist/dev/'),
    publicPath: './',
    filename: 'bundle/[name].bundle.js',
    chunkFilename: 'bundle/[id].chunk.js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue|)$/,
        exclude: [
          path.resolve(__dirname, '../node_modules/'),
          path.resolve(__dirname, '../src/semantic/'),
        ],
        loader: 'eslint-loader',
        options: {
          /* eslint-disable-next-line */
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true, // emitError: true in prod
        },
      },
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, '../node_modules/'),
        ],
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
        // use: [MiniCssExtractPlugin.loader, 'css-loader'], // for production
      },
      {
        test: /\.less$/,
        loader: ['vue-style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        // inline base64 URLs for <=8k images, direct URLs for the rest
        loader: 'url-loader?limit=8192&name=',
      },
      {
        test: /\.woff(2)?(\?v=[0-9.]+)?$/,
        loader: 'url-loader?prefix=font/&limit=10240&name=bundle/[name].[ext]',
        // [hash].[ext]
      },
      {
        test: /\.(eot|ttf|svg)(\?v=[0-9.]+)?$/,
        loader: 'url-loader?prefix=font/&limit=10240&name=bundle/[name].[ext]',
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?$!expose-loader?jQuery',
      },
      {
        // expose Vue object at Vue.default
        test: require.resolve('vue/dist/vue.esm.js'),
        loader: 'expose-loader?Vue',
      },
    ],
  },
  plugins: [
    // new webpack.optimize.OccurrenceOrderPlugin(), // production
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    new VueLoaderPlugin(),
    new FriendlyErrorWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['App running at http://localhost:3000'],
      },
    }),
    // new MiniCssExtractPlugin(), // production
  ],
  devtool: '#source-map',
  devServer: {
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
  },
  // bypass Entrypoint undeind false Positive erro caused by html-webpack-plugin
  /* eslint-disable-next-line */
  // https://github.com/jantimon/html-webpack-plugin/issues/895#issuecomment-379006202
  stats: {
    all: undefined,
    children: false,
  },
};

module.exports = config;
