var Login = { template:
  `<div class="row">
    <div class="input-field col s12">
      <input id="email" type="email" class="validate">
      <label for="email">Email</label>
    </div>
    <div class="input-field col s12">
      <input id="password" type="password" class="validate">
      <label for="password">Password</label>
    </div>
    <div class="col s12">
      <a class="waves-effect waves-light btn" v-on:click="loginWithGoogle">Google</a>
      <a class="waves-effect waves-light btn" id="loginF">Facebook</a>
    </div>
  </div>`,
  methods: {
    loginWithGoogle: function (event) {
      alert("hi");
    }
  },
};
// v-on:click="loginWithGoogle"

var Main = { template: '<div>bar</div>' };
var routes = [
  { path: '/', component: Login },
  { path: '/main', component: Main }
];

var router = new VueRouter({
  routes // short for routes: routes
});

var app = new Vue({
  router
}).$mount('#app')
