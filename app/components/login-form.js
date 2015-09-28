import Ember from 'ember';
import User from 'fire/models/user';

export default Ember.Component.extend({
  tagName:          'div',
  classNames:       [ 'login-container' ],

  open:             false,
  email:            null,
  password:         null,
  isAuthenticating: false,

  firebase: Ember.inject.service(),

  currentUser: Ember.inject.service('currentUser'),

  loggedIn: Ember.computed.bool('session.isAuthenticated'),

  dropdownState: Ember.computed('open', function() { if (this.get('open')) return 'open'; }),

  actions: {
    login: function() {
      this.set('isAuthenticating', true);
       this.get("session").open("firebase", {
        provider: 'password',
        email:    this.get('email'),
        password: this.get('password')
      })
      .then((data)=> {
        this.store.findQuery('user', { uid: data.uid }).then(function(user) {
          this.get('session').set('user', user)
          this.set('open', false);
        });
      })
      .catch(function() {
        return null
      })
      .finally(()=> {
        this.set('isAuthenticating', false);
      });

    },

    logout: function() {
      this.sendAction('signOut');
    },

    openLogin: function() {
      this.toggleProperty('open');
    }

  }

});
