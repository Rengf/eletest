import {
    RECEIVE_SHEET_LIST,
    RECEIVE_SHEETMUSIC_LIST,
    RECEIVE_PLAY_MUSIC
} from '../mutations-types'

import {
    reqSheetList,
    reqSheetMusicList,
    reqPlayMusic
} from './../../api/index'

const state = {
    sheetLists: [],
    sheetMusicLists: [],
    playMusic: {}
}

const getters = {
    sheetLists(state) {
        return state.sheetLists
    },
    sheetMusicLists(state) {
        return state.sheetMusicLists
    },
    playMusic(state) {
        return state.playMusic
    }
}


const actions = {
    async getSheetList({
        commit
    }, data) {
        const result = await reqSheetList(data)
        if (result.code == 200) {
            const sheetLists = result.playlists;
            console.log(sheetLists)
            commit(RECEIVE_SHEET_LIST, sheetLists)
        }
    },
    async getSheetMusicList({
        commit
    }, id) {
        const result = await reqSheetMusicList(id);
        if (result.code == 200) {
            const sheetMusicLists = result.playlist.tracks;
            commit(RECEIVE_SHEETMUSIC_LIST, sheetMusicLists)
        }
    },
    async getPlayMusic({
        commit
    }, id) {
        const result = await reqPlayMusic(id);
        if (result.code == 200) {
            const playMusic = result.data[0];
            commit(RECEIVE_PLAY_MUSIC, playMusic)
        }
    }
}


const mutations = {
    [RECEIVE_SHEET_LIST](state, sheetLists) {
        state.sheetLists = sheetLists;
    },
    [RECEIVE_SHEETMUSIC_LIST](state, sheetMusicLists) {
        state.sheetMusicLists = sheetMusicLists;
    },
    [RECEIVE_PLAY_MUSIC](state, playMusic) {
        state.playMusic = playMusic
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
}