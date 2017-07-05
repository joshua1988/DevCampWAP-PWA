<template lang="html">
  <form novalidate @submit.stop.prevent="submit">
    <section class="section-intro">
      <h1>PWAir</h1>
      <h2>Open the window when we push you</h2>
      <div class="main-icon-container">
        <span class="icon-laughing-face"></span>
        <span class="icon-face-open-mouth-eyebrows"></span>
        <span class="icon-angry-face-teeth"></span>
      </div>
    </section>
    <section class="section-login-input">
      <md-input-container>
        <md-input type="text" v-model="email" placeholder="Email"></md-input>
      </md-input-container>
      <md-input-container>
        <md-input type="password" v-model="password" placeholder="Password"></md-input>
      </md-input-container>
      <md-button class="btn-default btn-full" v-on:click.native="loginWithInfo">Login</md-button>
    </section>
    <section class="section-social-login">
      <md-button class="btn-google md-raised md-primary" v-on:click.native="loginWithGoogle">Google</md-button>
      <md-button class="btn-facebook md-raised md-primary">Facebook</md-button>
    </section>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  props: ['geoLocation', 'toastMessage'],
  methods: {
    loginWithGoogle(event) {
      var self = this;
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log("user : ", user);
        self.$router.push({path : '/home'});
      }).catch(function(error) {
        console.log("errorCode: " + error.code + ". errorMessage : " + error.message + ". email : " + error.email);
      });
    },
    loginWithInfo(event) {
      var self = this;
      if (this.loginExceptionHandler()) return true;

      firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
        if (error.code === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(error.message);
        }
        console.log(error);
      }).then(function (user) {
        console.log(user, "has been logged");
        self.clearForm();
        self.toastMessage(user.email + " just logged in");
        self.$router.push({path : '/home'});
      });
    },
    loginExceptionHandler() {
      if ( this.email === "" || this.password === "") {
        alert("enter the email and password");
        return true;
      }
      return false;
    },
    clearForm() {
      this.email = "";
      this.password = "";
    }
  }
}
</script>

<style lang="css">
.md-input-container {
  margin: 0px 0 24px;
}
button {
  border-radius: 1em;
}
.section-intro {
  text-align: center;
  padding: 7rem 0 1rem;
}
.main-icon-container {
  font-size: 3.2rem;
  color: white;
}
.section-intro h1 {
  margin: 0 0 1rem;
  font-size: 4rem;
  font-weight: bold;
}
.section-intro h2 {
  font-weight: 100;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 1.6rem;
}
.section-login-input {
  padding: 1.5rem;
  padding: 1.5rem;
  margin: 0 2rem 1rem;
  background: white;
  padding: 1rem 1.5rem 1.5rem;
}
.btn-default {
  background: #ffe340;
}
.btn-full {
  width: 100%;
  margin: 0;
}
.section-social-login {
  text-align: center;
}

</style>
