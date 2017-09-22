<template>
  <div class="player-status">
    <div class="player-status__item">{{$store.state.player.health}}</div>
    <button @click="toggleDarkness()" class="toggle-darkness">Toggle Darkness</button>
  </div>
</template>
<script>
  export default {
    methods: {
      toggleDarkness() {
        this.$store.commit('SET_DARKNESS', !this.$store.state.darkness);
      }
    }
  }
</script>
<style lang="scss">
  .player-status {
    width: 100%;
    background-color: #AAA;
    display: flex;
    &__item {
      padding: 1rem;
      color: darkolivegreen;
      font-size: 1.1rem;
      font-weight: 400;
    }
  }

  .toggle-darkness {
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