var path = require('path');
var webpack = require(path.join(process.env.FBI_NODEMODULES_PATH, 'webpack'));
var output = {
  filename: '[name].js',
  chunkFilename: '[id].chunk.js'
};
var plugins = [
  new webpack.optimize.CommonsChunkPlugin('common.js')
];
var plugins2 = [
  new webpack.optimize.CommonsChunkPlugin('common.js'),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
];
var mod = {
  loaders: [{
    test: /\.css$/,
    loaders: [
      'style',
      'css?minimize{advanced:false, aggressiveMerging:false}',
      'autoprefixer?{browsers:["last 2 versions", "> 5%", "safari >= 5", "ie >= 8", "opera >= 12", "Firefox ESR", "iOS >= 6", "android >= 4"]'
    ]
  }, {
    test: /\.scss$/,
    loaders: [
      'style',
      'css?minimize{advanced:false, aggressiveMerging:false}',
      'sass',
      'autoprefixer?{browsers:["last 2 versions", "> 5%", "safari >= 5", "ie >= 8", "opera >= 12", "Firefox ESR", "iOS >= 6", "android >= 4"]'
    ]
  }, {
    test: /\.(png|jpg|gif)$/,
    loader: 'url?limit=10000&name=../img/[name].[ext]'
  }, {
    test: /\.html$/,
    loader: 'html'
  }, {
    test: /\.json$/,
    loader: 'json'
  }, {
    test: /\.hbs$/,
    loader: "handlebars-loader?helperDirs[]=" + __dirname + "/src/script/hbs-helpers"
  }]
};
var resolveLoader = {
  modulesDirectories: [process.env.FBI_NODEMODULES_PATH]
};

module.exports.development = {
  debug: true,
  devtool: '#source-map',
  output: output,
  plugins: plugins,
  module: mod,
  resolveLoader: resolveLoader
};

module.exports.production = {
  output: output,
  plugins: plugins2,
  module: mod,
  resolveLoader: resolveLoader
};
