const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

// we are using the mode-based defaults (https://webpack.js.org/configuration/mode/)
const config = {
  // Tell webpack to root file of our client app
  entry: './src/client.js',

  // Tell webpack where to put output file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_DOMAIN: JSON.stringify(process.env.API_DOMAIN),
      },
    }),
  ],
  ...(process.env.NODE_ENV === 'development' && {
    devtool: 'inline-source-map',
  }),
  ...(process.env.NODE_ENV === 'production' && {
    stats: {
      colors: false,
      hash: true,
      timings: true,
      assets: true,
      chunks: true,
      chunkModules: true,
      modules: true,
      children: true,
    },
  }),
};

module.exports = merge(baseConfig, config);
