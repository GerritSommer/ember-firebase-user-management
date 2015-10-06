export function initialize(container, application) {
  application.inject('service:authentication', 'store', 'service:store');
  application.inject('service:authentication', 'session', 'torii-adapter:application');

  application.inject('route', 'authentication', 'service:authentication');
  application.inject('controller', 'authentication', 'service:authentication');
};

export default {
  name:       'firebase',
  initialize: initialize
};