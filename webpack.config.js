var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'calendar'), //the base directory for resolving the entry option
  entry: {build: ["webpack-dev-server/client?http://localhost:8088", "webpack/hot/dev-server", './app.js'] }, //the entry point for the bundle.
  output: {path: path.join(__dirname, 'assets'), filename: './bundle.js'}, //options affecting the output of the compilation.
  watch: true, //cache unchanged modules and output files between compilations
  resolve: {extensions: ['', '.js', 'index.js']}, //options affecting the resolving of modules.

  devtool: 'inline-source-map', //choose a developer tool to enhance debugging.

  module: { 
    loaders: [
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      {test: /\.js$/, loader: 'babel', query: { presets: ['es2015']}} //code transformation with ES6 to ES5
    ]
  },

  plugins: [
  new ExtractTextPlugin('styles.css'), //extraction of the contents of all connected CSS-files into one separate CSS-file
  new WebpackNotifierPlugin(), //display build status system notifications
  new webpack.ProvidePlugin({ //allows the use Jquery of the code
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
  }),
  new webpack.optimize.UglifyJsPlugin({ //minification code
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		}),
	new webpack.HotModuleReplacementPlugin()
  ]
};
