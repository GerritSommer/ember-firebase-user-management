import Ember from 'ember';

export default Ember.Object.extend({
  isAuthenticating: false,
  currentUser:      null,
  // store:            Ember.inject.service(),

  isLoggedIn: Ember.computed('currentUser', function(){
    if (this.store.adapterFor('application').get('firebase').getAuth()) { return true; }
  }),

  init: function() {
    this.store.adapterFor('application').get('firebase').onAuth((data)=> {
      if (!data) {
        this.setProperties({
          isAuthenticating: false,
          currentUser:    null
        });
      } else {
        // TODO: replace this with queryRecord when supported
        this.store.query('user', { uid: data.uid }).then((user)=> {
          this.setProperties({
            currentUser:    user.get('firstObject'),
            isAuthenticating: false
          });
        }, (error)=> {
          delete this.store.typeMapFor(this.store.modelFor('user')).idToRecord[data.uid];
          this.store.createRecord('user', {
            uid:     data.uid,
          }).save().then((user) => {
            this.setProperties({
              currentUser:    user,
              isAuthenticating: false
            })
          });
        });
      }
    });
  },

  login: function(email, password) {
    this.set('isAuthenticating', true);
    if (!email || !password) return;
    this.store.adapterFor('application').get('firebase').authWithPassword({
      email:    email,
      password: password
    }, (error, data)=> {
      if (error) {
        console.log("There was an authentication error: ", error);
      } else {
         this.store.findQuery('user', { uid: data.uid }).then((user)=> {
          this.set('currentUser', user);
          this.set('isAuthenticating', false);
        }, ()=> {
          // delete this.store.typeMapFor(this.store.modelFor('user')).idToRecord[data.uid];
          this.store.createRecord('user', {
            uid:   data.uid,
            email: data.password.email
          }).save().then((user)=> {
            this.set('currentUser', user);
            this.set('isAuthenticating', false);
          });
        });
      }
    });
  },

  logout: function(){
    this.store.adapterFor('application').get('firebase').unauth();
  }

});
