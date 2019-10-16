import {
    RECEIVE_PLAY_INDEX,
    RECEIVE_PLAYING,
    RECEIVE_SWITCH_LOOP,
    RECEIVE_MUSIC_MSG,
    RECEIVE_MUSIC,
    RECEIVE_NEW_CURRENT_TIME,
    RECEIVE_PREV_MUSIC,
} from '../mutations-types'

// import {

// } from './../../api/index'

const state = {
    playIndex: 0, //播放歌曲的位置
    playing: false, //是否播放
    loopIndex: 2, //播放循环方式
    musicMsg: {}, //音乐信息
    newCurrentTime: 0, //播放时间
    playedLists: [], //播放过的音乐列表
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
    },
    newCurrentTime(state) {
        return state.newCurrentTime
    },
    playedLists(state) {
        return state.playedLists
    },
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
    },

    setCurrentTime({
        commit
    }, newTime) {
        commit(RECEIVE_NEW_CURRENT_TIME, newTime)
    },

    setPrevMusic({
        commit
    }) {
        commit(RECEIVE_PREV_MUSIC)
    }
}


const mutations = {
    [RECEIVE_PLAY_INDEX](state, playIndex) {
        state.playIndex = playIndex;
        state.playedLists.push(playIndex)
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
    },
    [RECEIVE_NEW_CURRENT_TIME](state, newTime) {
        state.newCurrentTime = newTime
    },
    [RECEIVE_PREV_MUSIC](state) {
        state.playedLists.pop();
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
}