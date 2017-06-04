import Vue from 'vue'
// Vue Router
import VueRouter from 'vue-router';
import { routes } from './routes';
// Vue Material
import VueMaterial from 'vue-material'
import App from './App.vue'
// Vue Resource
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueMaterial);
Vue.use(VueResource);

const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
