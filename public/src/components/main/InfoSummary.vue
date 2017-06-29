<template>
  <!-- s-w-info : section-weather-info -->
  <section class="s-w-info">
    <!-- d-w-info : div-weather-info -->
    <div class="d-w-info">
      <!-- sp-w-elements : span-weather-elements -->
      <span class="sp-w-elements">미세먼지</span>
      <md-icon class="md-primary">sentiment_very_satisfied</md-icon>
      <!-- sp-w-figures : span-weather-figures -->
      <span class="sp-w-figures">좋음</span>
      <span>{{AirInfo.PM10}}</span>
    </div>
    <div class="d-w-info">
      <span class="sp-w-elements">초미세먼지</span>
      <md-icon class="md-accent">sentiment_neutral</md-icon>
      <span class="sp-w-figures">나쁨</span>
      <span>{{AirInfo.PM25}}</span>
    </div>
    <div class="d-w-info">
      <span class="sp-w-elements">오존</span>
      <md-icon class="md-warn">sentiment_very_dissatisfied</md-icon>
      <span class="sp-w-figures">보통</span>
      <span>{{AirInfo.O3}}</span>
    </div>
  </section>
</template>

<script>
export default {
  props: ['AirInfo']
}
</script>

<style lang="css">
  .s-w-info {
    display: flex;
    text-align: center;
    padding: 2% 0 2% 0;
  }
  .d-w-info {
    width: 33%;
    display: inline-grid;
  }
  .sp-w-elements {
    padding-bottom: 2%;
  }
  .sp-w-figures {
    padding-top: 2%;
  }
</style>
