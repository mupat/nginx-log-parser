const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dist = path.join(__dirname, 'dist');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './app.js',
    worker: './worker.js'
  },
  output: {
    path: dist,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader')
       }
    ]
  },
  devServer: {
    contentBase: dist,
    compress: true,
    port: 5000
  },
  watch: true,
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.ejs',
      title: 'Nginx Log Parser',
      chunks: ['app']
    }),
    new ExtractTextPlugin({
      filename: 'main.css',
      allChunks: true
    })
  ],
  resolve : {
    extensions: ['.js', '.jsx']
  }
};
