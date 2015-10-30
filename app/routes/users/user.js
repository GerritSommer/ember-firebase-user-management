import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
    return this.store.findRecord('user', params.user_id);
  },

  renderTemplate: function(controller, model) {
    // close other outlet if the id changes, to avoid open templates not represented in thr url
    var timeForDisconnect = 0, oldModelId = this.get('router.url').replace('/users', '');
    if (oldModelId !== model.get('id')) {
      this.disconnectOutlet('user-outlet-' + oldModelId);
      timeForDisconnect = 800;
    }
    Ember.run.later(this, function() {
      this.render({ outlet: 'user-outlet-' + model.get('id') });
    }, timeForDisconnect);
  }

});
