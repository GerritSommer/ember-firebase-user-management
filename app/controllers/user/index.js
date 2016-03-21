import Ember from 'ember';

let Controller = Ember.Controller;
let computed   = Ember.computed

export default Controller.extend({
  isCurrentUser: computed('model', 'authentication.currentUser', function() {
    return this.get('model.id') === this.get('authentication.currentUser.id');
  })
});
