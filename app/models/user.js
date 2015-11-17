import DS from 'ember-data';
import Ember from 'ember';
import ValidationsMixin from 'ember-computed-validations/mixins/computed-validations';
import momentFormat from 'ember-moment/computeds/format';

var attr    = DS.attr;
var hasMany = DS.hasMany;

var now = function() {
  return new Date().getTime();
}

export default DS.Model.extend(ValidationsMixin, {
  // Data attributes
  type:             attr('string', { defaultValue: 'baseUser' }),
  firstName:        attr('string'),
  lastName:         attr('string'),
  email:            attr('string'),
  gravatarLink:     attr('string'),

  createdAt:        attr('date', { defaultValue: function() { now() } }),
  updatedAt:        attr('date', { defaultValue: function() { now() } }),

  // Relations
  posts:            hasMany('post', { async: true }),

  // Local attributes
  password:         null,
  repeatedPassword: null,
  showErrors:       false,

  // Computed attributes
  createdAtDate: momentFormat('createdAt', 'DD.MM.YYYY HH:mm'),
  updatedAtDate: momentFormat('updatedAt', 'DD.MM.YYYY HH:mm'),

  fullName: Ember.computed('firstName', 'lastName', function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }),

  outletRepresentation: Ember.computed('id', function() {
    return 'user-outlet-' + this.get('id')
  }),
  // Validation properties
  firstNameNotEmpty:  Ember.computed.notEmpty('firstName'),
  lastNameNotEmpty:   Ember.computed.notEmpty('lastName'),
  passwordNotEmpty:   Ember.computed.notEmpty('password'),
  emailIsEmail:       Ember.computed.match('email', /^.+@.+\..+$/),

  shouldHaveEmail:    Ember.computed('isNew', 'email', function() {
    if (this.get('isNew')) {
      return this.get('emailIsEmail');
    } else {
      return true;
    }
  }),

  passwordsMatch:     Ember.computed('password1', 'password2', function() {
    if (this.get('isNew')) {
      return this.get('password') === this.get('repeatedPassword');
    }
  }),

  computedValidations: {
    firstName: {
      firstNameNotEmpty: 'First name is required.'
    },
    lastName: {
      'lastName': 'Last name is required.'
    },
    email: {
      shouldHaveEmail: function() {
        return `${this.get('user.email')} is not a valid email address.`;
      }
    },
    password: {
      passwordNotEmpty: 'Please enter a password.',
      passwordsMatch: 'The password fields must match.'
    }
  },

  // observers
  setUpdatedAt: function() {
    this.set('updatedAt', now());
  }.on('didUpdate'),

});
