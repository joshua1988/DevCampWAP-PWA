<template lang="html">
  <form novalidate @submit.stop.prevent="submit">
    <md-input-container>
      <md-icon>email</md-icon>
      <label>Email</label>
      <md-input type="text" v-model="email"></md-input>
    </md-input-container>
    <md-input-container>
      <md-icon>lock</md-icon>
      <label>Password</label>
      <md-input type="password" v-model="password"></md-input>
    </md-input-container>
    <div>
      <md-button class="md-raised md-primary" v-on:click.native="loginWithInfo">Login</md-button>
      <md-button class="md-raised md-primary" v-on:click.native="loginWithGoogle">Google</md-button>
      <md-button class="md-raised md-primary">Facebook</md-button>
    </div>
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
</style>
