import Vue from 'vue';
import Vuex from 'vuex'

import Player from '../models/Player';
import Item from '../models/Item';
import { items } from '../constants';
Vue.use(Vuex);

const state = {
  player: new Player(0, 0),
  map: [],
  darkness: true,
  lost: false,
  won: false,
  dungeon: 0,
  attackHistory: [],
  healthHistory: []
};

const mutations = {
  SET_DARKNESS(state, payload) {
    state.darkness = payload;
  },
  SET_PLAYER(state, payload) {
    state.player = payload;
  },
  SET_DUNGEON(state, payload) {
    state.dungeon = payload;
  },
  SET_WON(state, payload) {
    state.won = payload;
  },
  SET_LOST(state, payload) {
    state.lost = payload;
  },
  MOVE_PLAYER(state, payload) {
    const [x, y] = payload;
    const nextItem = state.map.map[state.player.x + x][state.player.y + y];
    switch (nextItem.id) {
      case items.WALL:
        return;
      case items.HEALTH:
        state.healthHistory.push(nextItem.amount);
        state.player.health += nextItem.amount;
        break;
      case items.WEAPON:
        state.player.weapon = nextItem;
        break;
      case items.ENEMY:
        const attack = Math.floor(Math.random() * state.player.weapon.attack + (10 * state.player.level) + 5);
        const damage = nextItem.attack;
        state.attackHistory.push(attack);
        state.healthHistory.push(-damage);
        nextItem.health -= attack;
        state.player.health -= damage;
        // if the player has no health left, the game is lost
        if (state.player.health <= 0) {
          state.lost = true;
        }
        // if the enemy still has health left, don't move foreward
        if (nextItem.health > 0) {
          return;
        }
        // if the boss was beaten, the game is won
        if (nextItem.boss) {
          state.won = true;
          return;
        }
        state.player.xp += nextItem.xp;
        break;
      case items.PORTAL:
        state.dungeon++;
    }
    state.map.map[state.player.x][state.player.y] = new Item(items.EMPTY, state.player.x, state.player.y);
    state.player.x += x;
    state.player.y += y;
    state.map.map[state.player.x][state.player.y] = state.player;
  },
  SET_MAP(state, payload) {
    state.map = payload;
  }
};

const getters = {
  mapArr: state => state.map.map,
  playerReference: state => state.map.map[state.player.x][state.player.y]
}

const actions = {
  moveRight({commit}) {
    commit('MOVE_PLAYER', [1, 0]);
  },
  moveLeft({commit}) {
    commit('MOVE_PLAYER', [-1, 0]);
  },
  moveBottom({commit}) {
    commit('MOVE_PLAYER', [0, 1]);
  },
  moveTop({commit}) {
    commit('MOVE_PLAYER', [0, -1]);
  },
  tryAgain({commit}) {
    commit('SET_WON', false);
    commit('SET_LOST', false);
    commit('SET_DUNGEON', 0);
  }
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
});