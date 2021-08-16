import Vue from "vue";
import Vuex from "vuex";
import actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex);

// 创建Store对象
export default new Vuex.Store({
  // 存放全局共享的数据
  state,
  mutations,
  actions,
  getters,
});
