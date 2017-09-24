<template>
  <div>
    <h2 class="title">Find an kill the boss in Dungeon 3</h2>
    <div class="player-status">
      <div class="player-status__item">
        Health: {{$store.state.player.health}}
        <div class="player-status__item__events">
          <transition-group name="event">
          <div v-for="let (item, i) in $store.state.healthHistory"
            :key="i" class="player-status__item__events__event"
            :style="{'color':  item >= 0 ? 'darkolivegreen' : 'firebrick'}"
          >
            {{item}}
          </div>
          </transition-group>
        </div>
      </div>
      <div class="player-status__item">
        Weapon: {{$store.state.player.weapon.name}} - {{$store.state.player.weapon.attack}} Att.
        <div class="player-status__item__events">
          <transition-group name="event">
          <div v-for="let (item, i) in $store.state.attackHistory" :key="i" class="player-status__item__events__event" style="color: darkolivegreen">
            Dealt {{item}} damage
          </div>
          </transition-group>
        </div>
      </div>
      <div class="player-status__item">Xp: {{$store.state.player.xp}}</div>
      <div class="player-status__item">Level: {{$store.state.player.level}}</div>
      <div class="player-status__item">Dungeon: {{$store.state.dungeon}}</div>
      <button @click="toggleDarkness()" class="button">Toggle Darkness</button>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      toggleDarkness() {
        this.$store.commit('SET_DARKNESS', !this.$store.state.darkness);
      },
    },
  };
</script>
<style lang="scss">
  .title {
    margin: 0;
    padding: .5rem 0;
    text-align: center;
    color: #DDD;
    font-weight: 300;
    background-color: #AAA;
  }
  .player-status {
    width: 100%;
    background-color: #AAA;
    display: flex;
    &__item {
      padding: 1rem;
      color: #DDD;
      font-size: 1.1rem;
      font-weight: 400;
      &__events {
        &__event {
          position: absolute;
          opacity: 0;
        }
      }
    }
  }

  .event-enter-active {
    animation: event-in 2s;
  }
  .event-leave-active {
    animation: event-in 1s reverse;
  }
  @keyframes event-in {
    0% {
      transform: translateY(-10px);
      opacity: 0;
    }
    50% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      transform: translateY(-5px);
      opacity: 0;
    }
  }
</style>