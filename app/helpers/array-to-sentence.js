// app/helpers/upper-case.js
import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(value) {
  if ( Ember.isArray(value) ) {
    return value.join(", ").capitalize();
  }

});