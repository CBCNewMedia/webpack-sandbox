const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
// const LoadablePlugin = require('@loadable/webpack-plugin');

// const DIST_PATH = path.resolve(__dirname, 'public/dist');
const production = process.env.NODE_ENV === 'production';
const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

// target:
//   node (aka server)
//   web  (aka browser, client)

let getConfig = (target) => {
  let targetSpec = {};

  if (target === 'node') {
    targetSpec = { target };
  } else if (target === 'web') {
    targetSpec = {
      target,
      entry: './src/client.js',
      // node: {
      //   global: false,
      // },
      // amd: false,
      devtool: 'inline-source-map',
    };
  }

  let config = merge(targetSpec, {
    name: target,
    mode: development ? 'none' : 'production',

    // mode: 'production',
    // entry: target === 'node' ? './src/index.js' : './src/client.js',

    // Tell webpack to run babel on every file it runs through
    resolve: {
      alias: {
        theme: path.resolve(__dirname, 'src/theme'),
        components: path.resolve(__dirname, 'src/components'),
        screens: path.resolve(__dirname, 'src/screens'),
        fonts: path.resolve(__dirname, 'src/fonts'),
        config: path.resolve(__dirname, 'src/config.js'),
        routes: path.resolve(__dirname, 'src/routes.js'),
        utils: path.resolve(__dirname, 'src/utils'),
      },
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/env', { targets: { browsers: ['last 2 versions'] } }],
                '@babel/preset-react',
              ],
              // caller: { target },
            },
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
    externals:
    target === 'node' ? [nodeExternals()] : undefined,
    output: {

      path: target === 'node' ? path.resolve(__dirname, 'build') : path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
      // filename: production ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
      // publicPath: '/',

    // path: path.join(DIST_PATH, target),
    // filename: '[name]-bundle-[chunkhash:8].js',
    // // publicPath: `/dist/${target}/`,
    // libraryTarget: target === 'node' ? 'umd' : undefined,
    },
    plugins:
    target === 'node'
      ? []
      : [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': `${process.env.NODE_ENV}`,
          'process.env.API_DOMAIN': `${process.env.API_DOMAIN}`,
        }),
      ],
    watchOptions: {
      ignored: '/node_modules/',
    },
    // optimization: {
    //   runtimeChunk: true,
    // },

    // devtool: (target === 'web' && development) ? 'inline-source-map' : false,
    // devtool: false,
    stats: (target === 'web' && production)
      ? {
        colors: false,
        hash: true,
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true,
        children: true,
      } : undefined,

  });

  return config;
};

// // export default [getConfig('web'), getConfig('node')];
// let targets = ['web'].map((target) => {
//   let config = getConfig(target);

//   // console.log(JSON.stringify(config));

//   return config;
// });

// module.exports = targets;

module.exports = ['web'].map((target) => {
  let config = getConfig(target);

  //  console.log(JSON.stringify(config));

  return config;
});
