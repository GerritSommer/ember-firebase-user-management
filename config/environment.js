/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'fire',
    environment: environment,
    contentSecurityPolicy: {
      'connect-src': "'self' https://scorching-torch-4275.firebaseio.com https://auth.firebase.com wss://*.firebaseio.com https://s-usc1c-nss-149.firebaseio.com",
      'img-src': "'self' http://www.gravatar.com/",
      'style-src': "'self' 'unsafe-inline'  localhost:4200",
      'font-src': "'self' data: http://fonts.gstatic.com",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com",
    },
    firebase: 'https://scorching-torch-4275.firebaseio.com/',
    torii: {
      sessionServiceName: 'session'
    },
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-cli-mirage'] = {
      enabled: false
    }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
