<template>
  <div class="game" :style="{ 'background-color': $store.state.darkness ? '#333' : '#777'  }">
    <rogue-player></rogue-player>
    <div class="map-container">
      <rogue-map :sight="7"></rogue-map>
    </div>
    <div v-if="$store.state.lost || $store.state.won" class="modal">
      <div class="modal__content">
        <h1 v-if="$store.state.lost">Game Over!</h1>
        <h1 v-if="$store.state.won">Game Won!</h1>
        <button class="button" @click="again()">Try again</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Map from './map';
import { items, weapons } from './constants';
import Player from './models/Player';
import Health from './models/Health';
import Enemy from './models/Enemy';
import Portal from './models/Portal';
import Boss from './models/Boss';

export default {
  name: 'game',
  created() {
    this.init();
    this.$store.watch(state => state.dungeon, val => this.init());
    window.addEventListener('keydown', this.onKeyPress);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeyPress);
  },
  methods: {
    ...mapActions(['moveRight', 'moveLeft', 'moveTop', 'moveBottom', 'tryAgain']),
    init() {
      const map = new Map(50);

      // create player
      if (this.$store.state.dungeon === 0) {
        let player = new Player();
        this.$store.commit('SET_PLAYER', player);
      }
      map.placeObject(this.$store.state.player);

      // create health
      Array(...Array(5)).map(_ => new Health()).forEach(h => map.placeObject(h));

      // create enemies, make the enemies stronger based on the dungeon
      const randomAttribute = () => Math.floor(Math.random() * (this.$store.state.dungeon * 8 + 10) + 5 + this.$store.state.dungeon * 3);
      Array(...Array(8)).map(_ => new Enemy(randomAttribute(), randomAttribute(), randomAttribute())).forEach(e => map.placeObject(e));

      // creates a weapon
      map.placeObject(weapons[this.$store.state.dungeon + 1]);

      // if the player is not in the final dungeon place a portal
      if (this.$store.state.dungeon < 3) {
        map.placeObject(new Portal());
      } else {
        map.placeBoss(new Boss());
      }

      this.$store.commit('SET_MAP', map);
    },
    onKeyPress(e) {
      if (this.$store.state.lost) {
        return;
      }
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
    },
    again() {
      this.tryAgain();
      this.init();
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
  .modal {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,.5);
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    &__content {
      background-color: #DDD;
      padding: 1rem 2rem;
      box-shadow: 1px 1px 3px 0px rgba(0,0,0,0.75);
      color: #333;
      .button {
        float: right;
      }
    }
  }

  .button {
    background-color: transparent;
    border: 2px solid #333;
    color: #333;
    margin: .25rem 0;
    font-size: 1.05rem;
    transition: all .3s ease;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    &:hover {
      background-color: #333;
      color: #DDD;
    }
  }
</style>
