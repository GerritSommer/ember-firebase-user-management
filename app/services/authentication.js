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
        this.set( 'currentUser', null );
        var router = this.container.lookup('router:main');
        router.transitionTo('/');
      } else {
        this.store.findRecord('user', data.uid ).then((user)=> {
          this.set( 'currentUser', user );
        }, (error)=> {
          this.store.createRecord('user', {
            id:    data.uid,
            email: data.password.email
          }).save().then((user) => {
            this.set( 'currentUser', user );
          });
        });
      }
    });
  },

  login: function( email, password, success, fail ) {
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
        fail(error);
      } else {
        success();
      }
    });
  },

  logout: function(){
    this.get('firebaseAdapter').unauth();
  }

});
