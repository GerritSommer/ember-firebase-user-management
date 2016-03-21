import Ember from 'ember';

let Route = Ember.Route;

export default Route.extend({
  templateName: 'user/form',

  model() {
    return this.modelFor('user');
  },

  actions: {
    cancel(user) {
      user.rollback();
      this.transitionTo('users');
    },

    saveUser(user) {
      // validate user before taking action

      user.save()
        .then((savedUser)=> {
          this.transitionTo( 'users.index');
        })
        .catch(()=> {
          user.set( 'showErrors', true );
        });


    }
  }
});
