// app/routes/application.js
import Ember from 'ember';

let Route = Ember.Route;

export default Route.extend({

  actions: {

    error: function(erorr) {
      return this.transitionTo('login');
    },

    goToProfile: function(user) {
      this.transitionTo('user.edit', user)
    },

    openModal: function(modalName) {
      return this.render(modalName, {
        into:   'application',
        outlet: 'model'
      });
    },

    closeModal: function() {
      return this.disconnectOutlet({
        outlet:     'modal',
        parentView: 'application'
      });
    }


  }
});