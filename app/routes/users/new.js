import Ember from 'ember';

let Route = Ember.Route;
let service = Ember.inject.service;

export default Route.extend({
  templateName:   'user/form',
  authentication: service(),

  model() {
    return this.store.createRecord('user');
  },

  actions: {

    cancel(user) {
      this.store.unloadRecord(user);
      this.transitionTo('users');
    }
  }

});
