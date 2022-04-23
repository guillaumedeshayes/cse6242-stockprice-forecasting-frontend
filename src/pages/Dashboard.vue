<template>
  <q-page class="q-ma-md">
    <stockFilters style="width: 100%"></stockFilters>

    <q-card class="q-mb-xs">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="realTimeForecast" label="Real Time Forecast" />
        <q-tab name="modelPerformance" label="Model Performance" />
        <!-- <q-tab name="histData" label="Historical Data View" /> -->
      </q-tabs>
    </q-card>

    <q-card class="q-ma-md q-pa-md row items-center justify-evenly" style="backgroundColor:#EF403C; color:white;" v-if="outOfMarketHours">
      <div>Forecast will be available at the opening of next market hours</div>
    </q-card>

    <q-tab-panels v-model="tab" animated v-if="isGlobalFunctionExecuted">
      <q-tab-panel name="realTimeForecast">
        <div class="column q-mb-xs">
          <div class="row">
            <div class="col-12 col-md-6 q-pa-xs">
              <candlestickChart></candlestickChart>
            </div>
            <div class="col-12 col-md-6 q-pa-xs">
              <marketSentimentTable></marketSentimentTable>
            </div>
          </div>
          <!-- <div>
            <rankingInStocksTable></rankingInStocksTable>
          </div> -->
        </div>
      </q-tab-panel>
      <q-tab-panel name="modelPerformance">
        <div class="text-subtitle2">Technical Analysis Forecast:</div>
        <div class="row q-mb-sm">
          <predictedClosePrice :forecast="technicalAnalysisForecast" class="col-grow q-ma-sm"></predictedClosePrice>
          <modelAccuracy :confidence="technicalAnalysisConfidence" class="col-grow q-ma-sm"></modelAccuracy>
        </div>
        <div class="text-subtitle2">Market Sentiment Forecast:</div>
        <div class="row">
          <predictedClosePrice :forecast="marketSentiment" class="col-grow q-ma-sm"></predictedClosePrice>
          <modelAccuracy :confidence="marketSentimentConfidence" class="col-grow q-ma-sm"></modelAccuracy>
        </div>
      </q-tab-panel>
      <!-- <q-tab-panel name="histData">
        <div class="row">
          <predictedClosePrice class="col-grow q-ma-sm"></predictedClosePrice>
          <modelAccuracy class="col-grow q-ma-sm"></modelAccuracy>
        </div>
      </q-tab-panel> -->
    </q-tab-panels>

    <!-- <div class="column q-mb-md">
      <div class="row">
        <predictedClosePrice class="col-grow q-ma-sm"></predictedClosePrice>
        <modelAccuracy class="col-grow q-ma-sm"></modelAccuracy>
      </div>
      <div class="row">
        <div class="col-12 col-md-8 q-pa-sm">
          <closePriceChart></closePriceChart>
        </div>
        <div class="col-12 col-md-4 q-pa-sm">
          <rankingInStocksTable></rankingInStocksTable>
        </div>
      </div>
    </div> -->
    <div class="q-pa-md row items-start q-gutter-md"></div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import stockFilters from "../components/StockFilters";
import predictedClosePrice from "../components/predictedClosePrice";
import modelAccuracy from "../components/modelAccuracy";
import rankingInStocksTable from "../components/rankingInStocksTable";
import candlestickChart from "../components/candlestickChart";
import marketSentimentTable from "../components/marketSentimentTable";

export default {
  name: "DataDashboard",
  data() {
    return {
      tab: "realTimeForecast",
      isGlobalFunctionExecuted: false,
    };
  },
  components: {
    stockFilters,
    predictedClosePrice,
    modelAccuracy,
    rankingInStocksTable,
    candlestickChart,
    marketSentimentTable,
  },
  computed: {
    ...mapState('stockPricePrediction', ['outOfMarketHours', 'marketSentiment', 'technicalAnalysisSentiment', 'technicalAnalysisConfidence', 'marketSentimentConfidence']),
  },
  methods: {
    ...mapActions('stockPricePrediction', ['fetchTechnicalForecast', 'fetchSentimentForecast']),
  },
  async mounted () {
    await this.fetchTechnicalForecast({ticker: 'AAPL'})
    await this.fetchSentimentForecast({ticker: 'AAPL'})
    this.isGlobalFunctionExecuted = true
  }
};
</script>
