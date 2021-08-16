import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 为了完整使用 ES6 的 API, 引入bable-polyfill
import "@babel/polyfill";

// Quasar-UI 插件库
import "./quasar";

// 引入Element-UI
import '@/utils/element'

// 引入Animate On Scroll
import AOS from "aos";
import "aos/dist/aos.css";

// 引入过滤器文件
import './utils/filter'

// 引入vue-lazyload懒加载工具
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('./assets/record/record-black2.png'),
})


// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    AOS.init()
  },
  render: h => h(App)

}).$mount("#app");
