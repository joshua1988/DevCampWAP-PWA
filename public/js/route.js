var provider = new firebase.auth.GoogleAuthProvider();

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
      return firebase.auth().signInWithPopup(provider).then(function(result) {
       // This gives you a Google Access Token. You can use it to access the Google API.
       var token = result.credential.accessToken;
       // The signed-in user info.
       var user = result.user;

       console.log(result);
       router.push({ path : 'main'});
      }).catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       // The email of the user's account used.
       var email = error.email;
       // The firebase.auth.AuthCredential type that was used.
       var credential = error.credential;

       console.log(error);
       // ...
      });
    }
  }};

var Main = { template: `
  <div class="row">
    <div class="col s12 m6">
      <div class="card">
        <div class="card-content">
          <span class="card-title">Card Title</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
          <a href="#">This is a link</a>
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>`,
  methods: {

  }};

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
