/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    environment:  environment,
    modulePrefix: 'fire',
    baseURL:      '/',
    locationType: 'auto',

    firebase:     'https://scorching-torch-4275.firebaseio.com/',
    torii:        { sessionServiceName: 'session' },

    googleFonts: [
      'Raleway:400,300,300italic,400italic,700,600,500',
    ],

    contentSecurityPolicy: {
      'connect-src': "'self' https://scorching-torch-4275.firebaseio.com https://auth.firebase.com wss://*.firebaseio.com https://s-usc1c-nss-149.firebaseio.com",
      'img-src':     "'self' http://www.gravatar.com/",
      'style-src':   "'self' 'unsafe-inline'  localhost:4200 fonts.googleapis.com",
      'font-src':    "'self' fonts.gstatic.com"
    },

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
