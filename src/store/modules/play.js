import {
    RECEIVE_PLAY_INDEX,
    RECEIVE_PLAYING
} from '../mutations-types'

// import {

// } from './../../api/index'

const state = {
    playIndex: 0,
    playing: false,
}

const getters = {
    playIndex(state) {
        return state.playIndex
    },
    playing(state) {
        return state.playing
    }
}


const actions = {
    playMusicIndex({
        commit
    }, playIndex) {
        commit(RECEIVE_PLAY_INDEX, playIndex)
    },

    isPlaying({
        commit
    }, playing) {
        commit(RECEIVE_PLAYING, playing)
    },
}


const mutations = {
    [RECEIVE_PLAY_INDEX](state, playIndex) {
        state.playIndex = playIndex;
    },
    [RECEIVE_PLAYING](state, playing) {
        state.playing = playing;
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
}