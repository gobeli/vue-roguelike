<template>
  <div class="game" :style="{ 'background-color': $store.state.darkness ? '#333' : '#777'  }">
    <rogue-player></rogue-player>
    <div class="map-container">
      <rogue-map :sight="7"></rogue-map>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Map from './map';
import { items } from './constants';
import Player from './models/Player';
import Health from './models/Health';
import Enemy from './models/Enemy';

export default {
  name: 'game',
  created() {
    const map = new Map(50);
    // create player
    let player = new Player();
    player = map.placeObject(player);
    this.$store.commit('SET_PLAYER', player);
    // create health
    Array(...Array(7)).map(_ => new Health()).forEach(h => map.placeObject(h));
    // create enemies
    Array(...Array(8)).map(_ => new Enemy(10, 20)).forEach(e => map.placeObject(e));

    this.$store.commit('SET_MAP', map);

    window.addEventListener('keydown', this.onKeyPress);
  },
  methods: {
    ...mapActions(['moveRight', 'moveLeft', 'moveTop', 'moveBottom']),
    onKeyPress(e) {
      switch(e.keyCode) {
        case 39:
          this.moveRight();
          break;
        case 37:
          this.moveLeft();
          break;
        case 38:
          this.moveTop();
          break;
        case 40:
          this.moveBottom();
      }
    }
  }
}
</script>
<style lang="scss">
  body, html {
    height: 100%;
    margin: 0;
    font-family: sans-serif;
  }
  .game {
    background-color: #777;
    min-height: 100%;
  }
  .map-container {
    display: flex;
    justify-content: center;
  }
</style>
