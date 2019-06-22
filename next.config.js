const withTypescript = require('@zeit/next-typescript');
module.exports = withTypescript({
  target: 'serverless',
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    return config;
  },
  webpackDevMiddleware: (config) => config,
});
