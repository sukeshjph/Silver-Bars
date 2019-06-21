const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  cache: true,
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-typescript'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
};