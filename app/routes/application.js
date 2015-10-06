// app/routes/application.js
import Ember from 'ember';

var uid

export default Ember.Route.extend({

  // onSession: function() {
  //   if (uid = this.get('session.uid')) {
  //     this.store.findQuery('user', { uid: uid }).then((users)=> {
  //       this.get('session').set('userObject', users.get('firstObject'))
  //     });
  //   }
  // }.observes('session.uid'),

});