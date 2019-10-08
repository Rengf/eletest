import {
    RECEIVE_PLAY_INDEX,
    RECEIVE_PLAYING,
    RECEIVE_SWITCH_LOOP,
    RECEIVE_MUSIC_MSG,
    RECEIVE_MUSIC
} from '../mutations-types'

// import {

// } from './../../api/index'

const state = {
    playIndex: 0,
    playing: false,
    loopIndex: 0,
    musicMsg: {}
}

const getters = {
    playIndex(state) {
        return state.playIndex
    },
    playing(state) {
        return state.playing
    },
    loopIndex(state) {
        return state.loopIndex
    },
    musicMsg(state) {
        return state.musicMsg
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

    setSwitchLoop({
        commit
    }, loopIndex) {
        commit(RECEIVE_SWITCH_LOOP, loopIndex)
    },

    setPlayMusicMsg({
        commit
    }, musicMsg) {
        commit(RECEIVE_MUSIC_MSG, musicMsg)
    },

    setMusic({
        commit
    }, [msg, value]) {
        commit(RECEIVE_MUSIC, [msg, value]);
    }
}


const mutations = {
    [RECEIVE_PLAY_INDEX](state, playIndex) {
        state.playIndex = playIndex;
    },
    [RECEIVE_PLAYING](state, playing) {
        state.playing = playing;
    },
    [RECEIVE_SWITCH_LOOP](state, loopIndex) {
        state.loopIndex = loopIndex
    },
    [RECEIVE_MUSIC_MSG](state, musicMsg) {
        state.musicMsg = musicMsg
    },
    [RECEIVE_MUSIC](state, [msg, value]) {
        state.musicMsg[msg] = value
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
}