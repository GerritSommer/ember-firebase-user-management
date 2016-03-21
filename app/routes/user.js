import Ember from 'ember';

let Route = Ember.Route;

export default Route.extend({

  model(params) {
    return this.store.findRecord('user', params.user_id);
  },

});
