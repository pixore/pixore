const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
module.exports = withCSS(
  withTypescript({
    target: 'serverless',
    webpack: (config, { webpack }) => {
      config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
      return config;
    },
    webpackDevMiddleware: (config) => config,
  }),
);
