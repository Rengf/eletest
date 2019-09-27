import {
    RECEIVE_PLAY_INDEX
} from '../mutations-types'

// import {

// } from './../../api/index'

const state = {
    playIndex: 0,
}

const getters = {
    playIndex(state) {
        return state.playIndex
    },
}


const actions = {
    playMusicIndex({
        commit
    }, playIndex) {
        commit(RECEIVE_PLAY_INDEX, playIndex)
    }
}


const mutations = {
    [RECEIVE_PLAY_INDEX](state, playIndex) {
        state.playIndex = playIndex;
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
}