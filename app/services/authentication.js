import Ember from 'ember';

export default Ember.Object.extend({
  isAuthenticating: false,
  currentUser:      null,

  firebaseAdapter: Ember.computed(function() {
    return this.store.adapterFor('application').get('firebase')
  }),

  isLoggedIn: Ember.computed('currentUser', function(){
    if ( this.get('firebaseAdapter').getAuth() ) {
      return true;
    }
  }),

  init: function() {
    this.get('firebaseAdapter').onAuth((data)=> {
      this.set( 'isAuthenticating', false );
      if ( !data ) {
        this.setProperties({
          currentUser:      null
        });
        var router = this.container.lookup('router:main');
        router.transitionTo('/');
      } else {
        this.store.findRecord('user', data.uid ).then((user)=> {
          this.setProperties({
            currentUser:      user
          });
        }, (error)=> {
          this.store.createRecord('user', {
            id:     data.uid,
            email: data.email
          }).save().then((user) => {
            this.setProperties({
              currentUser:      user
            })
          });
        });
      }
    });
  },

  login: function( email, password, callback ) {
    this.set( 'isAuthenticating', true );
    if ( !email || !password ) {
      this.set( 'isAuthenticating', false );
      return;
    }

    this.get('firebaseAdapter').authWithPassword({
      email:    email,
      password: password
    }, (error, data)=> {
      this.set( 'isAuthenticating', false );
      if (error) {
        console.log("There was an authentication error: ", error);
      } else {
        callback();
      }
    });
  },

  logout: function(){
    this.get('firebaseAdapter').unauth();
  }

});
