import Ember from 'ember';

let computed   = Ember.computed;
let Controller = Ember.Controller;

export default Controller.extend({
  searchQuery: '',

  filteredUsers: computed('model', 'searchQuery', function() {
    let searchQuery = this.get('searchQuery');
    let users       = this.get('model');

    if ( !(searchQuery && searchQuery.trim()) ) {
      return users;
    }

    return users.filter(function(user, index, self) {
      return user.get('fullName').toLowerCase().indexOf(searchQuery.toLowerCase()) != -1
    });
  })

});
