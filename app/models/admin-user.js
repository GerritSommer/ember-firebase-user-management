import DS from 'ember-data';
import User from './user';

let attr = DS.attr;

export default User.extend({
  type: attr('string', { defaultValue: 'adminUser' })
});
