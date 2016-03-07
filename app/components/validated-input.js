import Ember from 'ember';

let TextField = Ember.TextField;
let computed  = Ember.computed;
let isBlank   = Ember.isBlank;

export default TextField.extend({
  classNameBindings: [ 'invalid:errors:lalas' ],

  showErrors:        true,

  invalid: computed('errors.[]', 'showErrors', function() {
    if ( !isBlank(this.get('errors')) && this.get('showErrors') ) return true;
  })

});
