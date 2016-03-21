import Ember from 'ember';

let Controller = Ember.Controller;

export default Controller.extend({
  defaultGravatars: [
    { value: 'mm',        label: 'mystery man'       },
    { value: 'identicon', label: 'Identicon'         },
    { value: 'monsterid', label: 'Monster'           },
    { value: 'wavatar',   label: 'Generated faces'   },
    { value: 'retro',     label: 'Retro 8 bit'       },
    { value: 'blank',     label: 'White blank image' },
  ]
});
