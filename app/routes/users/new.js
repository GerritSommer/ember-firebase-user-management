import Ember from 'ember';

export default Ember.Route.extend({
  templateName:   'user/form',
  authentication: Ember.inject.service(),

  model: function() {
    return this.store.createRecord('user');
  },

  actions: {

    cancel: function(user) {
      this.store.unloadRecord(user);
      this.transitionTo('users')
    }
  }

});
