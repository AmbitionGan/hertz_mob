import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import mutations from './mutations.js'
<<<<<<< HEAD
import getter from './getter'
=======
import getters from './getters'
>>>>>>> 6f9070f9a0ec6fa102df46daccbd81b6304908c3
import state from './state'

Vue.use(Vuex)

const store = new Vuex.Store({
    actions,
    mutations,
<<<<<<< HEAD
    getter,
=======
    getters,
>>>>>>> 6f9070f9a0ec6fa102df46daccbd81b6304908c3
    state
})

export default store
