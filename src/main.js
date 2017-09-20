import Vue from 'vue';
import Game from './Game.vue';
import Map from './Map.vue';

Vue.component('rogue-map', Map);

new Vue({
  el: '#app',
  render: h => h(Game)
});
