import {
    RECEIVE_PLAY_VIDEO,
    RECEIVE_VIDEO_DETAIL,
    RECEIVE_PLAY_MV,
    RECEIVE_MV_DETAIL,
} from '../mutations-types'

import {
    reqPlayMv,
    reqMvDetail,
    reqPlayVideo,
    reqVideoDetail
} from '@/api/index'

const state = {
    playMv: {},
    mvDetail: {},
    playVideo: {},
    videoDetail: {},
}

const getters = {
    playMv(state) {
        return state.playMv
    },
    mvDetail(state) {
        return state.mvDetail
    },
    playVideo(state) {
        return state.playVideo
    },
    videoDetail(state) {
        return state.videoDetail
    },

}

const actions = {
    async playMv({
        commit
    }, [id, name]) {
        const result = await reqPlayMv(id);
        if (result.code == 200) {
            const playMv = result.data;
            playMv.name = name;
            commit(RECEIVE_PLAY_MV, playMv);
        }
    },
    async getMvDetail({
        commit
    }, id) {
        const result = await reqMvDetail(id);
        if (result.code == 200) {
            const mvDetail = result.data;
            commit(RECEIVE_MV_DETAIL, mvDetail);
        }
    },
    async playVideo({
        commit
    }, [id, name]) {
        const result = await reqPlayVideo(id);
        if (result.code == 200) {
            const playVideo = result.urls[0];
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
    [RECEIVE_PLAY_MV](state, playMv) {
        state.playMv = playMv
    },
    [RECEIVE_MV_DETAIL](state, mvDetail) {
        state.mvDetail = mvDetail
    },
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