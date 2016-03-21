import Ember from 'ember';
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';

let service = Ember.inject.service;

export default ToriiFirebaseAdapter.extend({
  firebase: service()
});