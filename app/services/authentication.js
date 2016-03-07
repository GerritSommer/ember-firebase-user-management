import Ember from 'ember';

let Objekt   = Ember.Object;
let computed = Ember.computed;

export default Objekt.extend({
  isAuthenticating: false,
  currentUser:      null,

  firebaseAdapter: computed(function() {
    return this.store.adapterFor('application').get('firebase');
  }),

  isLoggedIn: computed('currentUser', function(){
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
        }, ()=> {
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
    }, (error)=> {
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
