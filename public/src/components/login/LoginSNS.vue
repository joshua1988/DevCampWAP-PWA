<template>
  <section class="section-social-login">
    <md-button class="btn-google md-raised md-primary" v-on:click.native="loginWithGoogle">Google</md-button>
    <md-button class="btn-facebook md-raised md-primary">Facebook</md-button>
  </section>
</template>

<script>
export default {
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
    }
  }
}
</script>

<style lang="css">
.section-social-login {
  text-align: center;
}
</style>
