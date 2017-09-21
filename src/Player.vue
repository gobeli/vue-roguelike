<template>
  <div class="player-status">
    <div>{{$store.state.player.health}}</div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style>
  .player-status {
    display: flex;
  }
</style>