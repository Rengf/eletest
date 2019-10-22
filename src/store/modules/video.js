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
        return state.playVideo
    }
}

const actions = {
    async playVideo({
        commit
    }, [id, name]) {
        const result = await reqPlayVideo(id);
        if (result.code == 200) {
            const playVideo = result.data;
            playVideo.name = name;
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