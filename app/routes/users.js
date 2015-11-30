import Ember from 'ember';
let saveUserCallback  = function( user ) {
  if ( user.get('isNew') ) {
    user.update();
  }

  user.save()
    .then((savedUser)=> {
      this.transitionTo( 'user.index', savedUser );
    })
    .catch(()=> {
      user.set( 'showErrors', true );
    });
};

export default Ember.Route.extend({

  createAuthenticatedUser: function( user, callback ) {
    let firebase = this.store.adapterFor('application').get('firebase');
    firebase.createUser({
       email:    user.get('email'),
       password: user.get('password')
    }, callback);
  },


  model: function() {
    return this.store.findAll('user');
  },

  actions: {
    saveUser: function( user ) {
      // validate user before taking action
      if (user.get('computedIsValid')) {

        if ( user.get('isNew') ) {
          this.createAuthenticatedUser( user, saveUserCallback )
        } else {
          saveUserCallback( user )
        }

      } else {
        user.set( 'showErrors', true );
      }
    }
  }

});
