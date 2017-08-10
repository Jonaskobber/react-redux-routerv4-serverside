const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { resolve } = require('path');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const autoprefixer = require('autoprefixer');

module.exports = (env) => {
  const { ifProd, ifNotProd } = getIfUtils(env);
  const config = {
    context: resolve('src'),
    entry: {
      app: './client/index.js',
      vendor: ['react']
    },
    output: {
      filename: 'bundle.[name].js',
      path: resolve('dist'),
      publicPath: '/',
      pathinfo: ifNotProd()
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
        {
          test: /\.s?css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader', 'postcss-loader']
          })
        },
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
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      })),
      ifNotProd(new HtmlWebpackPlugin({
        template: './client/index.html'
      })),
      new webpack.DefinePlugin({
        'process.env':{
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new ExtractTextPlugin({
        filename: 'styles.css',
        allChunks: true
      })
    ]),
    devServer: {
      historyApiFallback: ifNotProd(true),
      proxy: ifNotProd({
        '/api': {
          target: process.env.API_URL || 'http://localhost:5000'
        }
      }),
      host: '0.0.0.0'
    }
  };

  if (env.debug) {
    console.log(config);
    debugger // eslint-disable-line
  }

  return config;
};
