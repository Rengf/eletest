import Vue from 'vue'
import Router from 'vue-router'
import HomeIndex from '../views/home/index'
import Find from '@/views/home/find/find'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            component: HomeIndex,
            children: [{
                path: '/',
                name: 'find',
                component: Find,
                meta: {
                    title: '首页',
                    keepAlive: false,
                }
            }]
        },
        {
            path: '/play',
            name: 'play',
            component: () =>
                import ('@/views/play/index.vue'),
            meta: {
                title: '播放页面',
                keepAlive: false,
            }
        },
        {
            path: '/sheet',
            name: 'sheet',
            component: () =>
                import ('@/views/sheet/index.vue'),
            meta: {
                title: '歌单广场',
                keepAlive: true,
            }
        },
        {
            path: '/sheetTag',
            name: 'sheetTag',
            component: () =>
                import ('@/views/sheetTag/index.vue'),
            meta: {
                title: '歌单标签',
                keepAlive: false,
            }
        },
        {
            path: '/singer',
            name: 'singer',
            component: () =>
                import ('@/views/singer/index.vue'),
            meta: {
                title: '歌手',
                keepAlive: true,
            }
        }, {
            path: '/singerMsg',
            name: 'singerMsg',
            component: () =>
                import ('@/views/singerMsg/index.vue'),
            meta: {
                title: '歌手信息',
                keepAlive: true,
            }
        }, {
            path: '/musicVideo',
            name: 'musicVideo',
            component: () =>
                import ('@/views/musicVideo/index.vue'),
            meta: {
                title: 'mv',
                keepAlive: true,
            }
        }, {
            path: '/video',
            name: 'video',
            component: () =>
                import ('@/views/video/index.vue'),
            meta: {
                title: '视频',
                keepAlive: true,
            }
        }, {
            path: '/topList',
            name: 'topList',
            component: () =>
                import ('@/views/topList/index.vue'),
            meta: {
                title: '排行榜',
                keepAlive: false,
            }
        }, {
            path: '/musicList',
            name: 'musicList',
            component: () =>
                import ('@/views/musicList/index.vue'),
            meta: {
                title: '歌单',
                keepAlive: true,
            }
        }, {
            path: '/search',
            name: 'search',
            component: () =>
                import ('@/views/search/index.vue'),
            meta: {
                title: '搜索',
                keepAlive: true,
            }
        }, {
            path: '/searchdetail',
            name: 'searchDetail',
            component: () =>
                import ('@/views/searchDetail/index.vue'),
            meta: {
                title: '搜索',
                keepAlive: true,
            }
        }
    ]
})