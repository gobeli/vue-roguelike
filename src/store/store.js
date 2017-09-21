import Vue from 'vue';
import Vuex from 'vuex'

import Player from '../models/Player';
import Item from '../models/Item';
import { items } from '../constants';
Vue.use(Vuex);

const state = {
  player: new Player(0, 0),
  map: []
};

const mutations = {
  SET_PLAYER(state, payload) {
    state.player = payload;
  },
  MOVE_PLAYER(state, payload) {
    const [x, y] = payload;
    const nextItem = state.map.map[state.player.x + x][state.player.y + y];
    switch (nextItem.id) {
      case items.WALL:
        return;
      case items.HEALTH:
        state.player.health += nextItem.amount;
        break;
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
  }
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
});