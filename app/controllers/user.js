import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    // has to be here to so we dont trigger the active-link-wrapper
    gotoUsers: function() {
      this.transitionToRoute('users');
    }
  }
});
