<template>
  <q-card flat bordered style="width: 100%">
    <q-card-section class="q-pt-xs row justify-between items-center">
      <div>
        <div class="text-subtitle2 q-mt-sm">Technical Analysis Forecast - <span :style="technicalAnalysisSentiment == 'Bullish' ? 'color:#00B746;' : 'color:#EF403C'">{{technicalAnalysisSentiment}}</span></div>
      </div>
    </q-card-section>
    <q-card-section>
      <div id="chart">
        <apexchart
          type="line"
          :options="chartOptions"
          :series="candleStickData"
          height="350"
        ></apexchart>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
// import ApexCharts from "apexcharts";
import { mapActions, mapState } from 'vuex';
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "candlestickChart",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "line",
          height: 350,
        },
        xaxis: {
          type: "datetime",
        },
        stroke: {
          width: [2, 1],
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
    };
  },
  computed: {
    ...mapState('stockPricePrediction', ['candleStickData', 'technicalAnalysisForecast', 'technicalAnalysisSentiment']),
  },
  methods: {
    ...mapActions('stockPricePrediction', ['fetchTechnicalForecast']),
  },
  // mounted () {
  //   console.log('Candlestick', this.candleStickData)
  //   this.fetchTechnicalForecast({ticker: 'AAPL'})
  // }
};
</script>
