<template lang="html">
  <div>
    <section>
      날씨 정보
    </section>
    <section>
      <md-button class="md-fab md-primary" v-on:click.native="shareToFacebook">
        <md-icon>share</md-icon>
      </md-button>
      <div class="fb-share-button" data-href="https://devcamp-firebase-52bee.firebaseapp.com/#/share" data-layout="button" data-size="large" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevcamp-firebase-52bee.firebaseapp.com%2F%23%2Fshare&amp;src=sdkpreparse">Share</a></div>

      <md-button class="md-fab">
        <md-icon>email</md-icon>
      </md-button>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    shareToFacebook() {

    }
  }
}
</script>

<style lang="css">
</style>
