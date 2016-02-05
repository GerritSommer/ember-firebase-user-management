import Ember from 'ember';
import User from 'fire/models/user';

export default Ember.Component.extend({
  tagName:            'div',
  classNames:         [ 'profile' ],
  classNameBindings:  [ 'open' ],
  open:               false,
  email:              null,
  password:           null,

  authentication:     Ember.inject.service(),

  isLoggedIn:         Ember.computed.alias('authentication.isLoggedIn'),
  isAuthenticating:   Ember.computed.alias('authentication.isAuthenticating'),

  didInsertElement() {
    $(document).mouseup((event)=> {
      if ( !this.get('open') ) return;
      if ( this.$().has(event.target).length === 0 ) {
        this.set('open', false);
      }
    });
  },

  willDestroyElement() {
    this.$().unbind('mouseup');
  },


  actions: {

    login: function()  {

      var success = ()=> {
        this.flashMessages.success('Welcome, you are logged in!', { timeout: 3000 });
        this.set('open', false);
      }

      var fail = (error)=> {
        this.flashMessages.danger('Bad credentials!', { timeout: 3000 });
      }

      this.get('authentication').login( this.get('email'), this.get('password'))
        .then(this.get('authentication').findOrCreateUser)
        .catch();
    },

    logout: function() {
      this.get('authentication').logout();
    },

    toggleDropdown: function()   {
      this.toggleProperty('open');
    },

    goToProfile: function() {
      this.set('open', false);
      this.sendAction( 'action', this.get('authentication.currentUser') );
    }

  }

});
