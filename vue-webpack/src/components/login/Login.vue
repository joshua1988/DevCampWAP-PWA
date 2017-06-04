<template lang="html">
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
    <div>
      <md-button class="md-raised md-primary" v-on:click.native="loginWithGoogle">Google</md-button>
      <md-button class="md-raised md-primary">Facebook</md-button>
    </div>
  </form>
</template>

<script>
export default {
  methods: {
    loginWithGoogle(event) {
      this.$router.push({path : '/home'});
    }
  }
}
</script>

<style lang="css">
  input {
    border-style: groove;
  }
  button {
    border-radius: 1em;
  }
</style>
