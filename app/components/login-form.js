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

  isLoggedIn:         Ember.computed.bool('authentication.isLoggedIn'),
  isAuthenticating:   Ember.computed('authentication.isAuthenticating', function() {
    return this.get('authentication.isAuthenticating')
  }),

  didInsertElement() {
    $(document).mouseup((event)=> {
      if ( !this.get('open') ) return;
      if ( !$(event.target).is(this.$()) ) {
        this.set('open', false);
      }
    });
  },


  actions: {
    login: function()  {
      this.get('authentication').login(this.get('email'), this.get('password'));
    },
    logout: function() {
      this.get('authentication').logout();
    },

    toggleDropdown: function()   {
      this.toggleProperty('open');
    }
  }

});
