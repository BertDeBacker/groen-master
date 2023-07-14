import Vue from 'vue';
import Vuex from 'vuex';

import infoModule from './modules/info/index';

Vue.use(Vuex);

export default new Vuex.Store({
  //If Vuex state is mutated outside of mutation handlers an error is thrown.
  //This ensures that all state mutations can be explicitly tracked by debugging tools.
  //Running in strict mode is expensive!!
  //Therefore we use the build tools to turn it off in production mode.
  //strict: process.env.NODE_ENV !== 'production',

  state: {},
  mutations: {},
  actions: {},
  modules: {
    info: infoModule
  }
});
