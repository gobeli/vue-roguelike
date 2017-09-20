<template>
  <div class="map">
    <ul class="row" v-for="(row, index) in map" :key="index">
      <li class="item" v-for="(item, i) in row" :key="i" :class="getClass(item, index, i)"></li>
    </ul>
  </div>
</template>
<script>
  import { itemClasses, items } from './constants';
  export default {
    props: {
      map: {
        type: Array,
        required: true
      },
      player: {
        type: Object,
        required: true
      },
      sight: {
        type: Number,
        required: true
      }
    },
    methods: {
      getClass(index, x, y) {
        let className = itemClasses[index];
        const diffX = this.player.x - x, diffY = this.player.y - y;
        if (Math.abs(diffX) > this.sight || Math.abs(diffY) > this.sight) {
          className += ' dark';
        } else if (Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) >= this.sight) {
          className += ' dark';
        }
        return className;
      }
    }
  }
</script>
<style lang="scss">
  $pixel-size: 10px;

  .map {
    margin: 1rem;
    overflow-x: visible;
  }
  .row {
    margin: 0;
    list-style-type: none;
    padding: 0;
    display: inline-block;
    .item {
      width: $pixel-size;
      height: $pixel-size;
    }
    .wall {
      background-color: #777;      
    }
    .empty {
      background-color: #AAA;
    }
    .player {
      background-color: #1af;
    }
    .health {
      background-color: darkolivegreen;
    }
    .enemy {
      background-color: firebrick;
    }
    .dark {
      background-color: #333;
    }
  }
</style>


