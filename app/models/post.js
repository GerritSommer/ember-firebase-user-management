import Ember from 'ember';
import DS from 'ember-data';
import ValidationsMixin from 'ember-computed-validations/mixins/computed-validations';
import momentFormat from 'ember-moment/computeds/format';

var attr      = DS.attr;
var belongsTo = DS.belongsTo;

var now = function() {
  return new Date().getTime();
}

export default DS.Model.extend(ValidationsMixin, {
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
  titleNotEmpty:  Ember.computed.notEmpty('firstName'),
  bodyNotEmpty:   Ember.computed.notEmpty('lastName'),

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
