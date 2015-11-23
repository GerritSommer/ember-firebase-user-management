import Ember from 'ember';

export default Ember.Controller.extend({
  isCurrentUser: Ember.computed('model', 'authentication.currentUser', function() {
    return this.get('model.id') === this.get('authentication.currentUser.id')
  })
});
