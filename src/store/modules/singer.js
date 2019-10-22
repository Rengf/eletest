import {
    RECEIVE_SINGER_LIST,
    RECEIVE_SINGER_ARTISTS,
    RECEIVE_SINGER_MV_LIST,
} from '../mutations-types'

import {
    reqSingerList,
    reqSingerArtists,
    reqsingerMvList
} from './../../api/index'

const state = {
    singerLists: [],
    newcode: "1001",
    singerArtists: {
        artist: {},
        hotSongs: []
    },
    singerMvList: [],
    singerId: 0,
}

const getters = {
    singerLists(state) {
        return state.singerLists
    },
    singerArtist(state) {
        return state.singerArtists.artist;
    },
    singerHotSongs(state) {
        return state.singerArtists.hotSongs;
    },
    fiveHotSongs(state) {
        var fiveSongs = [];
        for (let index = 0; index < 5; index++) {
            fiveSongs.push(state.singerArtists.hotSongs[index]);
        }
        return fiveSongs
    },
    singerMvList(state) {
        return state.singerMvList
    }
}

const actions = {
    async getSingerList({
        commit
    }, [data, newcode]) {
        const result = await reqSingerList(data);
        if (result.code == 200) {
            const singerLists = result.artists
            commit(RECEIVE_SINGER_LIST, [singerLists, newcode])
        }
    },
    async getSingerArtists({
        commit
    }, id) {
        const result = await reqSingerArtists(id);
        if (result.code == 200) {
            const artist = result.artist;
            const hotSongs = result.hotSongs;
            commit(RECEIVE_SINGER_ARTISTS, [artist, hotSongs])
        }
    },
    async getSingerMvList({
        commit
    }, [data, singerId]) {
        const result = await reqsingerMvList(data);
        if (result.code == 200) {
            const singerMvList = result.mvs;
            commit(RECEIVE_SINGER_MV_LIST, [singerMvList, singerId])
        }
    }
}
const mutations = {
    [RECEIVE_SINGER_LIST](state, [singerLists, newcode]) {
        if (state.newcode == newcode) {
            singerLists.forEach(val => {
                state.singerLists.push(val)
            })
        } else {
            state.newcode = newcode;
            state.singerLists = singerLists;
        }
    },
    [RECEIVE_SINGER_ARTISTS](state, [artist, hotSongs]) {
        state.singerArtists.artist = artist;
        state.singerArtists.hotSongs = hotSongs;
    },
    [RECEIVE_SINGER_MV_LIST](state, [singerMvList, singerId]) {
        if (state.singerId == singerId) {
            state.singerMvList = state.singerMvList.concat(singerMvList)
        } else {
            state.singerMvList = singerMvList
            state.singerId = singerId
        }

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}