import Ember from 'ember';

export default Ember.Route.extend({

  actions: {

    save: function( post ) {
      post
      .save()
      .then( (post)=> {
        this.transitionTo('post', post);
      });
    },

    cancel: function( post ) {
      post.rollback();
      this.transitionTo('posts.index');
    }
  }
});
