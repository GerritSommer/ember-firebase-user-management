import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: [  'ui', 'transition', 'hidden' ],

  didInsertElement() {
    this.$().transition({
      animation: 'slide down',
      duration: 300
    });
  },

  actions: {
    hide(args) {
      console.log(args);
      this.$().transition({
        animation: 'slide down',
        duration:   300,
        onComplete:   ()=> {
          this.sendAction('action', args);
        }
      });

      return;
    }
  }

});
