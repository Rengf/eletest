import {
    RECEIVE_SINGER_LIST,
    RECEIVE_SINGER_ARTISTS
} from '../mutations-types'

import {
    reqSingerList,
    reqSingerArtists
} from './../../api/index'

const state = {
    singerLists: [],
    singerArtists: {
        artist: {},
        hotSongs: []
    },
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
    }
}

const actions = {
    async getSingerList({
        commit
    }, data) {
        const result = await reqSingerList(data);
        if (result.code == 200) {
            const singerLists = result.artists
            commit(RECEIVE_SINGER_LIST, singerLists)
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
    }
}
const mutations = {
    [RECEIVE_SINGER_LIST](state, singerLists) {
        state.singerLists = singerLists
    },
    [RECEIVE_SINGER_ARTISTS](state, [artist, hotSongs]) {
        state.singerArtists.artist = artist;
        state.singerArtists.hotSongs = hotSongs;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}