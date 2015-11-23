import Ember from 'ember';
let searchQuery, users;

export default Ember.Controller.extend({
  searchQuery: '',

  filteredUsers: Ember.computed('model', 'searchQuery', function() {
    searchQuery = this.get('searchQuery');
    users = this.get('model');

    if ( !(searchQuery && searchQuery.trim()) )
      return users;

    return users.filter(function(user, index, self) {
      if( user.get('fullName').toLowerCase().indexOf(searchQuery.toLowerCase()) != -1 )
        return true;
    });
  })
});
