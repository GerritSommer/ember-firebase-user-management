import Ember from 'ember';

let Controller = Ember.Controller;
let computed   = Ember.computed;

export default Controller.extend({
  searchQuery: '',

  filteredUsers: computed('model', 'searchQuery', function() {
    let searchQuery = this.get('searchQuery');
    let users       = this.get('model').filterBy('isNew', false) || [];

    if ( !(searchQuery && searchQuery.trim()) ) {
      return users;
    }

    return users.filter(function(user, index, self) {
      if( user.get('fullName').toLowerCase().indexOf(searchQuery.toLowerCase()) != -1 )
        return true;
    });
  })

});
