// app/helpers/upper-case.js
import Ember from "ember";

let makeBoundHelper = Ember.Handlebars.makeBoundHelper;
let isArray         = Ember.isArray;

export default makeBoundHelper(function(value) {
  if ( isArray(value) ) {
    return value.join(", ").capitalize();
  }

});