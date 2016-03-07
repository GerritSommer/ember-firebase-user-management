import Ember from 'ember';

let Route = Ember.Route;

export default Route.extend({

  model: function(params) {
    return this.modelFor('user')
  }

});
