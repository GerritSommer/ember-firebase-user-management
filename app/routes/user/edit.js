import Ember from 'ember';

let Route = Ember.Route;

export default Route.extend({
  templateName: 'user/form',

  model() {
    return this.modelFor('user');
  },

  actions: {
    cancel(user) {
      user.rollback();
      this.transitionTo('users');
    },
  }
});
