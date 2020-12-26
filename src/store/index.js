import Vue from 'vue';
import Vuex from 'vuex';
import markets from './markets';
import users from './users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    markets,
    users,
  },
});
