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
       router.push({ path : '/list'});
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

  `,

};

var List = {
  template: `
  <div class="phone-viewport">
    <md-toolbar>
      <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">PWA</h2>

      <span style="flex: 1"></span>

      <md-button class="md-icon-button" v-on:click.native="refreshData">
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
      <md-list>
        <!-- <md-list-item>Plain Text</md-list-item>
        <md-list-item target="_blank" href="https://google.com">Link</md-list-item>
        <md-list-item @click.native="openAlert">Button</md-list-item> -->
        <md-list-item>
          <router-link to="/main">Main</router-link>
        </md-list-item>
        <md-list-item>
          <router-link to="/list">List</router-link>
        </md-list-item>
        <md-list-item>
          <router-link to="/">To Login</router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>

    <section>
      <md-card v-for="item in items" style="margin:15px;">
        <md-card-media>
          <!-- <img src="assets/card-image-2.jpg" alt="People"> -->
        </md-card-media>

        <md-card-content>
          {{item}}
        </md-card-content>
      </md-card>
    </section>

    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
      <span>{{snackbar_msg}}</span>
      <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">Close</md-button>
    </md-snackbar>
  </div>
  `,
  methods: {
    filterData: function (items) {
      return items.reduce(function (item) {
        console.log(item);
        return item.row;
      });
    },
    toggleLeftSidenav(event) {
      event.preventDefault();
      return this.$refs.leftSidenav.toggle();
    },
    signOut: function (event) {
      return firebase.auth().signOut().then(function() {
        router.push({ path: '/' })
      }, function(error) {
        console.log(error);
      });
    },
    refreshData: function () {
      this.snackbar_msg = "Refreshed the data.";
      return this.$refs.snackbar.open();
    },
    fetchData: function () {
      var self = this;
      return $.ajax({
        url : "http://openapi.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/xml/RealtimeCityAir/1/5/",
        success: function (result) {
          var parsedResult = xmlToJson(result);
          if (parsedResult.RealtimeCityAir.RESULT.CODE == "INFO-000") {
            console.log("the data was well received");
            self.items = parsedResult.RealtimeCityAir.row;
          }
        },
        error: function (error) {
          console.log("Failed at calling OPEN API", error);
        }
      });
    }
  },
  data: function () {
    return {
      items: null,
      vertical: 'bottom',
      horizontal: 'center',
      duration: 3000,
      snackbar_msg: ""
    }
  },
  created: function () {
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  }
};

var routes = [
  { path: '/', component: Login },
  { path: '/list', component: List },
  { path: '/main', component: Main }
];

var router = new VueRouter({
  routes // short for routes: routes
});

var app = new Vue({
  router
}).$mount('#app')
