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

  isAuthenticating:   Ember.computed('authentication.isAuthenticating', function() { return this.get('authentication.isAuthenticating') }),
  isLoggedIn:         Ember.computed.bool('authentication.isLoggedIn'),

  didInsertElement() {
    $(document).mouseup((event)=> {
      if (!this.get('open')) return;
      if (!$(event.target).is(this.$())) {
        this.set('open', false);
      }
    });
  },


  // $(document).mouseup (e) =>
  //     return if !container.is(":visible")
  //     if !$(e.target).is(container) and container.has(e.target).length is 0
  //       container.fadeToggle()

  actions: {
    login: function()  { this.get('authentication').login(this.get('email'), this.get('password')); },
    logout: function() { this.get('authentication').logout(); },

    toggleDropdown: function()   { this.toggleProperty('open'); },

    willTransition: function() { console.log('willTransition') }
  }

});
