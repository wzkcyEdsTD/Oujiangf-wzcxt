// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import commoncss from './css/common.css'
import Calendar from 'vue2-datepick'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import './js/flexible.js'; // 使用rem的js文件
import 'swiper/dist/css/swiper.css'; // swiper的css文件
import $api from './assets/index.js'
import 'url-search-params-polyfill'; // 兼容URLSearchParams
Vue.config.productionTip = false;
Vue.use(Calendar);
Vue.prototype.$http = $api;
Vue.use(Mint);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
