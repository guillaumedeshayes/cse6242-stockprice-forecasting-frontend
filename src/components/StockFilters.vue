<template>
  <div class="q-my-sm column justify-start">
    <div class="q-mb-xs row items-center justify-start">
      <q-select
        class="q-ma-sm"
        outlined
        dense
        :options="stockList"
        label="Stock"
        style="width: 250px"
        v-model="selectedStock"
        @update:model-value="val => updateData(val)"
      />
    </div>
    <!-- @input="updateData"
        map-options
        option-label="name"
        emit-value
        use-chips
        multiple -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "filters",
  data() {
    return {
      stockList: [
        "AAPL",
        "IBM",
        "NVDA",
        "INTC",
        "CSCO",
        "MSFT",
        "INFY",
        "ORCL",
        "CRM",
        "UBER",
      ],
      selectedStock: "AAPL",
    };
  },
  methods: {
    ...mapActions('stockPricePrediction', ['fetchTechnicalForecast', 'fetchSentimentForecast']),
    updateData(val) {
      console.log(val)
      this.fetchTechnicalForecast({ticker: val})
      this.fetchSentimentForecast({ticker: val})
    }
  },
};
</script>
