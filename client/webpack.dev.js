const path = require('path');

const chalk = require('chalk');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const common = require('./webpack.common.js');

console.log(chalk.green('Building client for development...'));

module.exports = merge.smart(common, {
  watch: true,
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules\/(?!(typeface-roboto)\/).*/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, './src/stylesheets')],
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      tslint: './../tslint.json',
      tsconfig: './tsconfig.json',
      // watch is optional but improves performance (fewer stat calls)
      watch: ['./src', './test'],
      checkSyntacticErrors: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
});
