<template lang="html">
  <div class="share-buttons-container">
    <md-button class="md-fab md-fab-bottom-left">
      <md-icon>save</md-icon>
    </md-button>

    <md-button class="md-fab md-primary md-fab-bottom-center">
      <md-icon>dialpad</md-icon>
    </md-button>

    <md-button class="md-fab md-fab-bottom-right">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
export default {
  methods: {
    shareToFacebook() {
      console.log("clicked");
    }
  }
}
</script>

<style lang="css">
.share-buttons-container {
  position: absolute;
  background: white;
  top: 80%;
  bottom: 0;
  width: 100%;
}
</style>
