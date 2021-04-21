const path = require("path");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.tsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        enforce: "pre",
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitWarning: true,
          failOnError: false,
          failOnWarning: false
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              // ... other plugins
              require.resolve('react-refresh/babel'),
            ],
          },
        },

      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: [{
            loader: 'babel-loader',
            options: {
              plugins: ['react-refresh/babel']
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            },
          },
        ],
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          //options: { minimize: true }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|mp3|wav)$/,
        use: ['file-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      favicon: "./src/components/icons/favicon.ico",
      template: "./src/index.html",
      filename: "./index.html",
      // favicon: "../src/html/favicon.ico",
      excludeChunks: ['']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),

  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};
