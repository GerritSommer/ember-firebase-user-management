// app/routes/application.js
import Ember from 'ember';

var uid

export default Ember.Route.extend({

  actions: {
    error: function(erorr) {
      return this.transitionTo('login');
    },
    goToProfile: function(user) {
      this.transitionTo('user.edit', user)
    }
  }
});