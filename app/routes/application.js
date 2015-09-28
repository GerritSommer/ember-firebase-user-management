// app/routes/application.js
import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get("session").fetch().catch(function() {});
  },

  actions: {
    signIn: function(email, password) {
      this.get("session").open("firebase", {
        provider: 'password',
        email:    email,
        password: password
      }).then(function(data) {
        console.log(data.currentUser);
      });
    },

    signOut: function() {
      console.log('test');
      this.get("session").close();
    }

  }
});