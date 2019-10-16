import {
    REVEIVE_SINGER_LIST,
    RECEIVE_SINGER_LIST
} from '../mutations-types'

import {
    reqSingerList
} from './../../api/index'

const state = {
    singerLists: []
}

const getters = {
    singerLists(state) {
        return state.singerLists
    }
}

const actions = {
    async getSingerList({
        commit
    }, data) {
        const result = await reqSingerList(data);
        console.log(result)
        if (result.code == 200) {
            const singerLists = result.artists
            commit(RECEIVE_SINGER_LIST, singerLists)
        }
    }
}
const mutations = {
    [RECEIVE_SINGER_LIST](state, singerLists) {
        state.singerLists = singerLists
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}