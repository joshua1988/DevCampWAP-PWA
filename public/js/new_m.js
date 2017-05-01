Vue.use(VueMaterial);

var provider = new firebase.auth.GoogleAuthProvider();

var Login = { template:
  `<div class="main-content">
    <form novalidate @submit.stop.prevent="submit">
      <md-input-container>
        <md-icon>email</md-icon>
        <label>Email</label>
        <md-input type="text"></md-input>
      </md-input-container>
      <md-input-container>
        <md-icon>lock</md-icon>
        <label>Password</label>
        <md-input type="password"></md-input>
      </md-input-container>
    </form>
    <md-button class="md-raised md-primary" v-on:click.native="loginWithGoogle">Google</md-button>
    <md-button class="md-raised md-primary">Facebook</md-button>
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
  }
};

var Main = { template: `
  <div class="phone-viewport">
    <md-toolbar>
      <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">PWA</h2>
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Sidenav content</h3>
        </div>
      </md-toolbar>
    </md-sidenav>
  </div>
  `,
  methods: {
    toggleLeftSidenav(event) {
      event.preventDefault();
      this.$refs.leftSidenav.toggle();
    },
  }
};

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
