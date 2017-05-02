Vue.use(VueMaterial);

var provider = new firebase.auth.GoogleAuthProvider();

var Login = {
  template: `
  <div class="main-content">
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
       router.push({ path : '/main'});
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

var Main = {
  template: `
  <div class="phone-viewport">
    <md-toolbar>
      <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">PWA</h2>

      <span style="flex: 1"></span>

      <md-button class="md-icon-button">
        <md-icon>refresh</md-icon>
      </md-button>
      <md-button class="md-icon-button" v-on:click.native="signOut">
        <md-icon>exit_to_app</md-icon>
      </md-button>
    </md-toolbar>
    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Sidenav content</h3>
        </div>
      </md-toolbar>
    </md-sidenav>

    <md-card>
      <md-card-media>
        <img src="assets/card-image-2.jpg" alt="People">
      </md-card-media>

      <md-card-content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.
      </md-card-content>
    </md-card>
  </div>
  `,
  methods: {
    toggleLeftSidenav(event) {
      event.preventDefault();
      return this.$refs.leftSidenav.toggle();
    },
    signOut: function (event) {
      return firebase.auth().signOut().then(function() {
        // Sign-out successful.
        router.push({ path: '/' })
      }, function(error) {
        // An error happened.
        console.log(error);
      });
    }
  },
  created: function () {
    // `this` points to the vm instance
    $.ajax({
      url : "http://openapi.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/xml/RealtimeCityAir/1/5/",
      success: function (result) {
        // var parsedResult = parser.toJson(result);
        // console.log(parsedResult);
        var result = xmlToJson(result);
        console.log(result);
      }
    });
    console.log("Main compoment was created");
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
