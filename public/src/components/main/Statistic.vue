<template lang="html">
  <div>
    <header>
      <h3>지난 미세먼지 지수 보기</h3>
    </header>
    <md-input-container>
      <label for="selectedDate">날짜 선택</label>
      <md-select name="selectedDate" id="selectedDate" v-model="selectedPastDate">
        <md-option value="yesterday">어제</md-option>
        <md-option value="lastMonth">지난달</md-option>
      </md-select>
    </md-input-container>
    <!-- Vue Chart -->
    <BarChart v-bind:selectedPastDate="selectedPastDate"></BarChart>
  </div>
</template>

<script>
// https://vuejsfeed.com/blog/create-charts-with-vue-chartjs
import BarChart from '../../utils/charts.js';
import { eventBus } from '../../main';

export default {
  data () {
    return {
      selectedPastDate: ''
    }
  },
  methods: {
    
  },
  components: {
    BarChart
  },
  watch: {
    selectedPastDate(e) {
      eventBus.$emit('selectPastDate', this.selectedPastDate);
    }
  }
}
</script>

<style scoped>

</style>
