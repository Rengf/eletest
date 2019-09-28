import {
    RECEIVE_SHEET_LIST,
    RECEIVE_SHEETMUSIC_LIST,
    RECEIVE_PLAY_MUSIC,
    RECEIVE_SHEETCATEGORY_LIST
} from '../mutations-types'

import {
    reqSheetList,
    reqSheetMusicList,
    reqPlayMusic,
    reqSheetCategoryList
} from './../../api/index'

const state = {
    sheetLists: [],
    sheetMusicLists: [],
    playMusic: {},
    sheetCategoryLists: []
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
    },
    sheetCategoryLists(state) {
        return state.sheetCategoryLists
    },
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
    },
    async getSheetCategoryList({
        commit
    }) {
        const result = await reqSheetCategoryList();
        if (result.code == 200) {
            const sheetCategoryLists = result.tags;
            console.log(result.sub)
            commit(RECEIVE_SHEETCATEGORY_LIST, sheetCategoryLists)
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
        state.playMusic = playMusic;
    },
    [RECEIVE_SHEETCATEGORY_LIST](state, sheetCategoryLists) {
        state.sheetCategoryLists = sheetCategoryLists;
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
}