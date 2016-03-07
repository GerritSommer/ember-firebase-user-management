import Ember            from 'ember';
import DS               from 'ember-data';
import ValidationsMixin from 'ember-computed-validations/mixins/computed-validations';
import momentFormat     from 'ember-moment/computeds/format';

let Model     = DS.Model;
let attr      = DS.attr;
let belongsTo = DS.belongsTo;
let notEmpty  = Ember.computed.notEmpty;

let now = function() {
  return new Date().getTime();
}

export default Model.extend(ValidationsMixin, {
  // Data attributes
  title:     attr('string'),
  body:      attr('string'),

  createdAt: attr('date', { defaultValue: now() }),
  updatedAt: attr('date', { defaultValue: now() }),

  author:    belongsTo('user', { async: true }),

  // Computed attributes
  createdAtDate: momentFormat('createdAt', 'DD.MM.YYYY HH:mm'),
  updatedAtDate: momentFormat('updatedAt', 'DD.MM.YYYY HH:mm'),

  // Validation properties
  titleNotEmpty:  notEmpty('firstName'),
  bodyNotEmpty:   notEmpty('lastName'),

  computedValidations: {
    title: {
      titleNotEmpty: 'First name is required.'
    },
    body: {
      bodyNotEmpty: 'First name is required.'
    }
  },

  // observers
  setUpdatedAt: function() {
    this.set('updatedAt', now());
  }.on('didUpdate'),
});
