import Vue from 'vue';
import Vuex from 'vuex'

import Player from '../models/Player';

Vue.use(Vuex);

const state = {
  player: new Player(0, 0),
  map: []
};

const mutations = {
  SET_PLAYER(state, payload) {
    state.player = payload;
  },
  SET_MAP(state, payload) {
    state.map = payload;
  }
};

const getters = {
  mapArr: state => state.map.map,
}

export default new Vuex.Store({
  getters,
  state,
  mutations
});