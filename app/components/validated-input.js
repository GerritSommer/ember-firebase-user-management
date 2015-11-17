import Ember from 'ember';

export default Ember.TextField.extend({
  classNameBindings: [ 'invalid:errors:lalas' ],

  showErrors:        true,

  invalid:           Ember.computed('errors.[]', 'showErrors', function() {
    if ( !Ember.isEmpty(this.get('errors')) && this.get('showErrors') ) return true;
  })

});
