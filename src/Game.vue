<template>
  <rogue-map :sight="7"></rogue-map>
</template>

<script>
import Map from './map';
import { items } from './constants';
import Player from './models/Player';
import Health from './models/Health';
import Enemy from './models/Enemy';

export default {
  name: 'game',
  created() {
    const map = new Map(75);
    // create player
    let player = new Player();
    player = map.placeObject(player);
    this.$store.commit('SET_PLAYER', player);
    // create health
    Array(...Array(10)).map(_ => new Health()).forEach(h => map.placeObject(h));
    // create enemies
    Array(...Array(10)).map(_ => new Enemy(10, 20)).forEach(e => map.placeObject(e));

    this.$store.commit('SET_MAP', map);
  }
}
</script>