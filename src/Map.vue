<template>
  <div class="map">
    <ul class="row" v-for="(row, index) in mapArr" :key="index">
      <li class="item" v-for="(item, i) in row" :key="i" :class="getClass(item)"></li>
    </ul>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { itemClasses, items } from './constants';
  export default {
    props: {
      sight: {
        type: Number,
        required: true
      }
    },
    computed: mapGetters([
      'mapArr'
    ]),
    methods: {
      getClass(obj) {
        let className = itemClasses[obj.id];
        const diffX = this.$store.state.player.x - obj.x, diffY = this.$store.state.player.y - obj.y;
        if ((Math.abs(diffX) > this.sight || Math.abs(diffY) > this.sight) && this.$store.state.darkness) {
          className += ' dark';
        } else if (Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) >= this.sight && this.$store.state.darkness) {
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


