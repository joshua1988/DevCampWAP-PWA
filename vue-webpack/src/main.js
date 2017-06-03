import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
// const 로 선언했기 때문에 {} 사용
import { routes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
