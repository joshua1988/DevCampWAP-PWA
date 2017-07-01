<template>
  <!-- s-w-info : section-weather-info -->
  <section class="weather-info-section">
    <!-- d-w-info : div-weather-info -->
    <div class="weather-info-container">
      <div class="d-w-info">
        <!-- sp-w-elements : span-weather-elements -->
        <span class="sp-w-elements">미세먼지</span>
        <md-icon class="md-size-2x">sentiment_very_satisfied</md-icon>
        <!-- sp-w-figures : span-weather-figures -->
        <span class="sp-w-figures">좋음</span>
        <span>{{AirInfo.PM10}}</span>
      </div>
      <div class="d-w-info">
        <span class="sp-w-elements">초미세먼지</span>
        <md-icon class="md-accent md-size-2x">sentiment_neutral</md-icon>
        <span class="sp-w-figures">나쁨</span>
        <span>{{AirInfo.PM25}}</span>
      </div>
      <div class="d-w-info">
        <span class="sp-w-elements">오존</span>
        <md-icon class="md-warn md-size-2x">sentiment_very_dissatisfied</md-icon>
        <span class="sp-w-figures">보통</span>
        <span>{{AirInfo.O3}}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['AirInfo']
}
</script>

<style lang="css">
  .weather-info-section {
    position: absolute;
    background: white;
    top: 50%;
    bottom: 0;
    width: 100%
  }
  .weather-info-container {
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
  .share-button-container {

  }
</style>
