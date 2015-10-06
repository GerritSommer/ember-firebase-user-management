import Ember from 'ember';

export default Ember.Route.extend({

  // beforeModel: function() {
  //   if (!this.get('firebase').get('authed')) {
  //     this.replaceWith('index');
  //   }
  // },

  model: function() {
    return this.store.findAll('user');
  }

});
