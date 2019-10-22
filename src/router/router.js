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
                    title: '首页'
                }
            }]
        },
        {
            path: '/play',
            name: 'play',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ('@/views/play/index.vue'),
            meta: {
                title: '播放页面'
            }
        },
        {
            path: '/sheet',
            name: 'sheet',
            component: () =>
                import ('@/views/sheet/index.vue'),
            meta: {
                title: '歌单广场'
            }
        },
        {
            path: '/sheetTag',
            name: 'sheetTag',
            component: () =>
                import ('@/views/sheetTag/index.vue'),
            meta: {
                title: '歌单广场'
            }
        },
        {
            path: '/singer',
            name: 'singer',
            component: () =>
                import ('@/views/singer/index.vue'),
            meta: {
                title: '歌手'
            }
        }, {
            path: '/singerMsg',
            name: 'singerMsg',
            component: () =>
                import ('@/views/singerMsg/index.vue'),
            meta: {
                title: '歌手信息'
            }
        }, {
            path: '/musicVideo',
            name: 'musicVideo',
            component: () =>
                import ('@/views/musicVideo/index.vue'),
            meta: {
                title: 'mv'
            }
        }
    ]
})