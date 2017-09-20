<template>
  <rogue-map :map="map" :player="player" sight="7"></rogue-map>
</template>

<script>
import { generateMap, placeObject, placeObjects } from './map';
import { items } from './constants';

export default {
  name: 'app',
  data () {
    return {
      map: generateMap(75),
      player: null
    }
  },
  created() {
    // create player
    this.player = placeObject(this.map, items.PLAYER);
    // create health
    placeObjects(this.map, items.HEALTH, 10);
    // create enemies
    placeObjects(this.map, items.ENEMY, 10);
  }
}
</script>