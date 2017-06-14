<template>
  <section class="s-w-info">
    <!-- d-w-info : div-weather-info -->
    <div class="d-w-info">
      <md-icon class="md-primary">sentiment_very_satisfied</md-icon>
      <span>미세먼지 : </span>
    </div>
    <div class="d-w-info">
      <md-icon class="md-accent">sentiment_neutral</md-icon>
      <span>이산화질소 : </span>
    </div>
    <div class="d-w-info">
      <md-icon class="md-warn">sentiment_very_dissatisfied</md-icon>
      <span>오존 : </span>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="css">
  .s-w-info {
    display: flex;
    text-align: center;
  }
  .d-w-info {
    width: 33%;
    display: inline-grid;
  }
</style>
