import Vue from 'vue';
import Game from './Game.vue';
import Map from './Map.vue';
import Player from './Player.vue';
import store from './store/store';

Vue.component('rogue-map', Map);
Vue.component('rogue-player', Player);

new Vue({
  el: '#app',
  store,
  render: h => h(Game)
});
