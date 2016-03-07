import Ember from 'ember';

let Controller = Ember.Controller;

export default Controller.extend({
  isCurrentUser: Ember.computed('model', 'authentication.currentUser', function() {
    return this.get('model.id') === this.get('authentication.currentUser.id')
  })
});
