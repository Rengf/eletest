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
    sheetCategoryLists: [],
    playLists: [],
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
    playLists(state) {
        return state.playLists
    }
}


const actions = {
    async getSheetList({
        commit
    }, data) {
        const result = await reqSheetList(data);
        if (result.code == 200) {
            const sheetLists = result.playlists;
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
    }, playingMusic) {
        const result = await reqPlayMusic(playingMusic[0]);
        if (result.code == 200) {
            const playMusic = result.data[0];
            playMusic.name = playingMusic[1];
            playMusic.singer = playingMusic[2];
            playMusic.image = playingMusic[3]
            commit(RECEIVE_PLAY_MUSIC, playMusic)
        }
    },
    async getSheetCategoryList({
        commit
    }) {
        const result = await reqSheetCategoryList();
        if (result.code == 200) {
            const sheetCategoryLists = result;
            commit(RECEIVE_SHEETCATEGORY_LIST, sheetCategoryLists)
        }
    }
}


const mutations = {
    [RECEIVE_SHEET_LIST](state, sheetLists) {
        state.sheetLists = sheetLists;
    },
    [RECEIVE_SHEETMUSIC_LIST](state, sheetMusicLists) {
        sheetMusicLists.forEach(val => {
            state.playLists.push(val)
        })
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