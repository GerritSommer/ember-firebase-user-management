import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
    return this.store.findRecord('user', params.user_id);
  },

  // close the previous outlet if the id changes, to avoid open templates not represented in the url
  renderTemplate: function( controller, model ) {
    let oldModelId, oldModelIdUrl = this.get('router.url').match(/\/(-[^\/]*)/);

    // Get the :user_id from the current url to find out its the one to be used
    if ( Ember.isArray(oldModelIdUrl) && ( oldModelId = oldModelIdUrl.get('firstObject') )) {
      if ( oldModelId !== model.get('id') ) {
        this.disconnectOutlet( 'user-outlet-'+ oldModelId );
      }
    }
    this.render({ outlet: 'user-outlet-'+ model.get('id') });
  }

});
