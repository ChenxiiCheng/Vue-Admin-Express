import Vue from 'vue';
import App from './App.vue';
import './plugins/element.js';
import router from './router';

import './style.css';

Vue.config.productionTip = false;

import http from './http';
Vue.prototype.$http = http;

// upload图片使用的是element ui底层的http，所以没有加authorization: token
// 所以请求接口被禁止，这里使用mixin就是在Vue的实例上挂载东西
Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload';
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      };
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
