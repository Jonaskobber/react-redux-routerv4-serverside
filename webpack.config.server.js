const webpack = require('webpack');
const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

module.exports = (env) => {
  const { ifProd } = getIfUtils(env);
  const config = {
    context: resolve('src'),
    entry: {
      app: './app.js'
    },
    output: {
      filename: 'server.[name].js',
      path: resolve('dist')
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
        { test: /\.s?css$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
        { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=1000000&mimetype=application/font-woff' },
        { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=1000000&mimetype=application/octet-stream' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=1000000&mimetype=image/svg+xml' },
        { test: /\.(jpe?g|png|gif)$/i, loader: 'url-loader?limit=1000000' },
        { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
        { test: /\.ya?ml$/, loader: 'json-loader!yaml-loader' }
      ]
    },
    plugins: removeEmpty([
      new webpack.DefinePlugin({
        'process.env':{
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
    ]),
    target: 'node',
    externals: [nodeExternals()],
    node: {
      __dirname: false
    }
  };

  return config;
};

