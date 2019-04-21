import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import mutations from './mutations.js'
import getters from './getters'
import state from './state'

Vue.use(Vuex)

const store = new Vuex.Store({
    actions,
    mutations,
    getters,
    state
})

export default store
