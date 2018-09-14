// Dependencies
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  devtool: 'source-map',
  entry: {
    head: path.join(__dirname, 'src/assets/scripts/head.js'),
    main: path.join(__dirname, 'src/assets/scripts/main.js'),
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'assets/scripts/[name].js',
    chunkFilename: 'assets/scripts/async/[name].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, 'src/assets/scripts'),
    },
  },
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      inject: false,
    }),
    new BundleAnalyzerPlugin(),
  ],
};
