import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;

export default DS.Model.extend({
  uid:          attr('number'),
  firstName:    attr('string'),
  lastName:     attr('string'),
  email:        attr('string'),
  gravatarLink: attr('string'),
  createdAt:    attr('date', { defaultValue: function() { new Date().getTime(); } }),
  updatedAt:    attr('date', { defaultValue: function() { new Date().getTime(); } }),

  fullName: Ember.computed('firstName', 'lastName', function() { return this.get('firstName') + ' ' + this.get('lastName'); }),

});
