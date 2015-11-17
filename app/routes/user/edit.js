import Ember from 'ember';

export default Ember.Route.extend({
  templateName: 'user/form',

  model: function(params) {
    return this.modelFor('user');
  }
});
