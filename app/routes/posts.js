import Ember from 'ember';

let Route = Ember.Route;

export default Route.extend({
  model() {
    return this.store.findAll('post');
  }
});
