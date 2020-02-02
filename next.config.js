const dotenv = require('dotenv');
const withOffline = require('next-offline');
const withCSS = require('@zeit/next-css');

dotenv.config();

const ONE_MONTH = 30 * 24 * 60 * 60;

const config = {
  target: 'serverless',
  transformManifest: (manifest) => ['/'].concat(manifest),
  generateInDevMode: true,
  generateInDevMode: true,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: ONE_MONTH,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    return config;
  },
  webpackDevMiddleware: (config) => config,
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_SCOPE: 'openid profile',
    REDIRECT_URI: process.env.REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    SESSION_COOKIE_LIFETIME: 7200, // 2 hours
  },
};

module.exports = withOffline(withCSS(config));
