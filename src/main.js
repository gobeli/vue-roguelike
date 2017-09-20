import Vue from 'vue';
import Game from './Game.vue';
import Map from './Map.vue';
import store from './store/store';

Vue.component('rogue-map', Map);

new Vue({
  el: '#app',
  store,
  render: h => h(Game)
});
