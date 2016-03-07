import Ember from 'ember';
import User from 'fire/models/user';

let Component = Ember.Component;
let inject    = Ember.inject;
let alias     = Ember.computed.alias;

export default Component.extend({
  tagName:            'div',
  classNames:         [ 'profile' ],
  classNameBindings:  [ 'open' ],
  open:               false,
  email:              null,
  password:           null,

  authentication:     inject.service(),

  isLoggedIn:         alias('authentication.isLoggedIn'),
  isAuthenticating:   alias('authentication.isAuthenticating'),

  didInsertElement() {
    $(document).mouseup((event)=> {
      if ( !this.get('open') ) return;
      if ( this.$().has(event.target).length === 0 ) {
        this.set('open', false);
      }
    });
  },

  willDestroyElement() {
    $(document).unbind('mouseup');
  },

  actions: {
    login()  {
      var self = this;

      let success = function() {
        self.flashMessages.success('Welcome, you are logged in!', { timeout: 3000 });
        self.set('open', false);
      }

      let fail = function(error) {
        self.flashMessages.danger('Bad credentials!', { timeout: 3000 });
      }

      this.get('authentication').login( this.get('email'), this.get('password'), success, fail );
      return;
    },

    logout: function() {
      this.get('authentication').logout();
      return;
    },

    toggleDropdown: function()   {
      this.toggleProperty('open');
      return;
    },

    goToProfile: function() {
      this.set('open', false);
      this.sendAction( 'action', this.get('authentication.currentUser') );
      return;
    }

  }

});
