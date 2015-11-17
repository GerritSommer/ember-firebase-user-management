import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('users', function() {
    this.route('new');
    this.route('user', { resetNamespace: true,  path: '/:user_id' }, function() {
      this.route('edit');
    });
  });

  this.route('posts');
});

export default Router;
