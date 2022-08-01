const webpack = require('webpack');
const config = require('./webpack.config.base.js');

module.exports = Object.assign({}, config, {
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    ...config.entry,
  ],

  plugins: [
    ...config.plugins.slice(0, 3),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    ...config.plugins.slice(4),
  ],
});
