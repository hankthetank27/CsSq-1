const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      { 
        test: /\.jsx?/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname)
    },
    port: 8000, 
    compress: true,
    hot: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};