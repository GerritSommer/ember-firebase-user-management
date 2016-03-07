import Ember from 'ember';

let Controller = Ember.Controller;

export default Controller.extend({
   actions: {
    // has to be here to so we dont trigger the active-link-wrapper
    gotoUsers: function() {
      this.transitionToRoute('users');
    }
  }
});
