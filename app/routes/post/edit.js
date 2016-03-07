import Ember from 'ember';

let Route = Ember.Route;

export default Route.extend({

  actions: {

    save(post) {
      post
      .save()
      .then((post)=> {
        this.transitionTo('post', post);
      });
    },

    cancel(post) {
      post.rollback();
      this.transitionTo('posts.index');
    }
  }
});
