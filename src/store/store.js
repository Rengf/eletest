import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import Music from './modules/music'
import play from './modules/play'
import singer from './modules/singer'
import Video from './modules/video'
import Top from './modules/top'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        Music,
        play,
        singer,
        Video,
        Top
    }
})