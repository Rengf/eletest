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
    topOriginalLists(state) {
        let originalLists = [];
        state.topLists.forEach(val => {
            if (val.tracks.length == 3) {
                originalLists.push(val)
            }
        })
        return originalLists;
    },
    topOtherLists(state) {
        let topOtherLists = [];
        state.topLists.forEach(val => {
            if (val.tracks.length == 0) {
                topOtherLists.push(val)
            }
        })
        return topOtherLists
    }
}

const actions = {
    async getTopList({
        commit
    }, data) {
        const result = await reqTopList();
        console.log(result)
        if (result.code == 200) {
            const topLists = result.list;
            commit(RECEIVE_TOP_LIST, topLists)
        }

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