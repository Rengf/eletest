import {
    RECEIVE_SHEET_LIST,
    RECEIVE_SHEETMUSIC_LIST
} from '../mutations-types'

import {
    reqSheetList,
    reqSheetMusicList
} from './../../api/index'

const state = {
    sheetLists: [],
    sheetMusicLists: [],
}

const getters = {
    sheetLists(state) {
        return state.sheetLists
    },
    sheetMusicLists(state) {
        return state.sheetMusicLists
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
    }, data) {
        const result = await reqSheetMusicList(data);
        console.log(result)
        if (result.code == 200) {
            const sheetMusicLists = result.playlist.tracks;
            console.log(sheetMusicLists)
            commit(RECEIVE_SHEETMUSIC_LIST, sheetMusicLists)
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
}
export default {
    state,
    actions,
    mutations,
    getters,
}