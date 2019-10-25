import {
    RECEIVE_PLAY_VIDEO,
    RECEIVE_VIDEO_DETAIL
} from '../mutations-types'

import {
    reqPlayVideo,
    reqVideoDetail
} from '@/api/index'

const state = {
    playVideo: {},
    videoDetail: {}
}

const getters = {
    playVideo(state) {
        return state.playVideo
    },
    videoDetail(state) {
        return state.videoDetail
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
    },
    async getVideoDetail({
        commit
    }, id) {
        const result = await reqVideoDetail(id);
        console.log(result)
        if (result.code == 200) {
            const videoDetail = result.data;
            commit(RECEIVE_VIDEO_DETAIL, videoDetail);
        }
    }
}

const mutations = {
    [RECEIVE_PLAY_VIDEO](state, playVideo) {
        state.playVideo = playVideo
    },
    [RECEIVE_VIDEO_DETAIL](state, videoDetail) {
        state.videoDetail = videoDetail
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}