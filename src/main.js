import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Api from './api/index.js';
import JsonViewer from 'vue-json-viewer'
import router from "@/router";
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.prototype.$api = Api;
Vue.use(JsonViewer)


Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')



