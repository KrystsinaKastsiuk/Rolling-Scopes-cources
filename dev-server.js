var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var devServer = new WebpackDevServer (
	webpack(config), { contentBase: __dirname + '/assets/', publicPath: '/calendar/', hot: true, stats: {colors: true} }
).listen(8088, 'localhost');