<template lang="html">
  <div>
    <!-- header on the top -->
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

    <!-- side navbar -->
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
          <router-link to="/home">Home</router-link>
        </md-list-item>
        <md-list-item>
          <router-link to="/list">List</router-link>
        </md-list-item>
        <md-list-item>
          <router-link to="/">To Login</router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>
  </div>
</template>

<script>
  import { eventBus } from '../../main';

  export default {
    props: {
      'toastMessage': Function
    },
    methods: {
      // Header Buttons
      toggleLeftSidenav(event) {
        event.preventDefault();
        return this.$refs.leftSidenav.toggle();
      },
      refreshData() {
        eventBus.$emit('refresh', 10);
      },
      signOut(event) {
        var self = this;
        firebase.auth().signOut().then(function() {
          self.toastMessage('Logged out');
          self.$router.push({path : '/'});
        }, function(error) {
          console.log("error : ", error);
        });
      }
    }
  }
</script>

<style lang="css">
</style>
