<template lang="html">
  <div class="phone-viewport">
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

    <!-- alert on the bottom -->
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
      <span>{{snackbar_msg}}</span>
      <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">Close</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import parseString from 'xml2js';
export default {
  methods: {
    fetchData() {
      console.log(`add the fetch feature`);
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
}
</script>

<style lang="css">
</style>
