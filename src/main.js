import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import axios from 'axios'
import moment from 'moment'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css'
import './assets/css/reset.css'
import './assets/css/iconfont/iconfont.css'
import './assets/css/iconfont/iconfont.js'
import './registerServiceWorker'


axios.defaults.withCredentials = true
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})

// 页面标题
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next()
})

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')