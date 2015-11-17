import Ember from 'ember';

export default Ember.Route.extend({
  templateName:   'user/form',
  authentication: Ember.inject.service(),

  model: function() {
    return this.store.createRecord('user');
  },

  actions: {

    cancelNewUser: function(user) {
      this.store.unloadRecord(user);
      this.transitionTo('users')
    },

    saveUser: function(user) {
      let firebase = this.store.adapterFor('application').get('firebase');

      // validate user before taking action
      if (user.get('computedIsValid')) {

        // TODO: Move this to the authentication service
        firebase.createUser({
          email:    user.get('email'),
          password: user.get('password')
        }, (error)=> {

          if (error) {
            switch (error.code) {
              case "EMAIL_TAKEN":
                console.log("The new user account cannot be created because the email is already in use.");
                break;
              case "INVALID_EMAIL":
                console.log("The specified email is not a valid email.");
                break;
              default:
                console.log("Error creating user:", error);
            }

          } else {

            user.save()
            .then((newUser)=> {
              this.transitionTo( 'user.index', newUser );
            })
            .catch(()=> {
              user.set( 'showErrors', true );
            });
          }
        });
      } else {
        user.set( 'showErrors', true );
      }
    }
  }

});
