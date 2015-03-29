var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');

module.exports = {
  entry: './src/Combobox.js',

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'lib'),
    library: 'Combobox',
    libraryTarget: 'commonjs2'
  },

  target: 'node',

  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader?experimental=true'},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')}
    ]
  },

  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
};

