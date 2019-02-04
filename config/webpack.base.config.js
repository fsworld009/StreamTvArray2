const path = require('path');
const webpack = require('webpack');

const srcPath = path.resolve(__dirname, '../src/');
const testPath = path.resolve(__dirname, '../test/');

// webpack plugins
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCssDiscardFontFace = require('postcss-discard-font-face');
const CssNano = require('cssnano');
const AutoPrefixer = require('autoprefixer');

function getConfig(options = {}) {
  const isDevMode = options.mode === 'development';

  const cssMinifier = (options.optimization && options.optimization.minimize)
    ? [CssNano()] : [];

  const styleLoaders = [
    isDevMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          PostCssDiscardFontFace(['woff']),
          AutoPrefixer(),
        ].concat(cssMinifier),
      },
    },
  ];

  return {
    mode: options.mode,
    entry: options.entry,
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
      modules: [testPath, srcPath, path.resolve(__dirname, '../node_modules/')],
    },
    output: options.output,
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          include: [srcPath, testPath],
          exclude: [
            path.resolve(__dirname, '../src/semantic/'),
          ],
          loader: 'eslint-loader',
          options: {
            /* eslint-disable-next-line */
            formatter: require('eslint-friendly-formatter'),
            emitWarning: true,
          },
        },
        {
          test: /\.js$/,
          include: [srcPath, testPath],
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
          use: styleLoaders,
        },
        {
          test: /\.less$/,
          loader: styleLoaders.concat(['less-loader']),
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.(png|jpe?g|gif)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ].concat(isDevMode ? [
        {
          test: require.resolve('jquery'),
          loader: 'expose-loader?$!expose-loader?jQuery',
        },
        {
          // expose Vue object at Vue.default
          test: require.resolve('vue/dist/vue.esm.js'),
          loader: 'expose-loader?Vue',
        },
      ] : []),
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
    ].concat(options.plugins),
    devtool: '#source-map',
    optimization: Object.assign({
      noEmitOnErrors: true,
    }, options.optimization),
    performance: {
      maxEntrypointSize: 10 * 1024 * 1024,
      maxAssetSize: 10 * 1024 * 1024,
    },
  };
}

module.exports = getConfig;
