import Ember from 'ember';
import User from 'fire/models/user';

export default Ember.Component.extend({
  tagName:          'div',
  classNames:       [ 'login-container' ],

  loginOpen:        false,
  profileOpen:      false,
  email:            null,
  password:         null,

  authentication:   Ember.inject.service(),

  isAuthenticating: Ember.computed('authentication.isAuthenticating', function() { return this.get('authentication.isAuthenticating') }),
  isLoggedIn:         Ember.computed.bool('authentication.isLoggedIn'),

  showLogin:        Ember.computed('loginOpen', function() { if (this.get('loginOpen')) return 'open'; }),
  showProfile:      Ember.computed('profileOpen', function() { if (this.get('profileOpen')) return 'open'; }),

  actions: {
    login: function()  { this.get('authentication').login(this.get('email'), this.get('password')); },
    logout: function() { this.get('authentication').logout(); },

    toggleLogin: function()   { this.toggleProperty('loginOpen'); },
    toggleProfile: function() { this.toggleProperty('profileOpen'); }
  }

});
