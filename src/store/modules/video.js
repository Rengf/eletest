import {
    RECEIVE_PLAY_VIDEO
} from '../mutations-types'

import {
    reqPlayVideo
} from '@/api/index'

const state = {
    playVideo: {},
}

const getters = {
    playVideo(state) {
        return state.playVideo.url
    }
}

const actions = {
    async playVideo({
        commit
    }, id) {
        const result = await reqPlayVideo(id);
        console.log(result)
        if (result.code == 20) {
            const playVideo = result.data;
            commit(RECEIVE_PLAY_VIDEO, playVideo);
        }
    }
}

const mutations = {
    [RECEIVE_PLAY_VIDEO](state, playVideo) {
        state.playVideo = playVideo
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}