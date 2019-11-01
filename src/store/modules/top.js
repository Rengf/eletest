import {
    RECEIVE_TOP_LIST
} from '../mutations-types'

import {
    reqTopList
} from '@/api/index'

const state = {
    topLists: [],
}

const getters = {
    topLists(state) {
        return state.topLists
    }
}

const actions = {
    async getTopList({
        commit
    }, data) {
        const result = await reqTopList();
        console.log(result)
        if (result.code == 200) {
            console.log(result)
        }
        // commit(RECEIVE_TOP_LIST, topLists)
    }
}

const mutations = {
    [RECEIVE_TOP_LIST](state, topLists) {
        state.topLists = topLists
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}