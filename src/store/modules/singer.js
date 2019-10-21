import {
    RECEIVE_SINGER_LIST,
    RECEIVE_SINGER_ARTISTS,
    RECEIVE_SINGER_MV,
} from '../mutations-types'

import {
    reqSingerList,
    reqSingerArtists,
    reqSingerMv
} from './../../api/index'

const state = {
    singerLists: [],
    newcode: "1001",
    singerArtists: {
        artist: {},
        hotSongs: []
    },
    singerMv: []
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
    singerMv(state) {
        return state.singerMv
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
    async getSingerMv({
        commit
    }, id) {
        const result = await reqSingerMv(id);
        console.log(result)
        if (result.code == 200) {
            const singerMv = result.mvs;
            commit(RECEIVE_SINGER_MV, singerMv)
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
    [RECEIVE_SINGER_MV](state, singerMv) {
        state.singerMv = singerMv
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}