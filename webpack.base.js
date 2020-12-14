const path = require('path');
// @TODO: the font files are not needed by the server
module.exports = {
  mode: process.env.NODE_ENV,
  // Tell webpack to run babel on every file it runs through
  resolve: {
    alias: {
      theme: path.resolve(__dirname, 'src/theme'),
      components: path.resolve(__dirname, 'src/components'),
      screens: path.resolve(__dirname, 'src/screens'),
      fonts: path.resolve(__dirname, 'src/fonts'),
      config: path.resolve(__dirname, 'src/config.js'),
      routes: path.resolve(__dirname, 'src/routes.js'),
      utils: path.resolve(__dirname, 'src/utils')
      ,
    },
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            ['@babel/env', { targets: { browsers: ['last 2 versions'] } }],
          ],
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: { injectType: 'lazyStyleTag' },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};
