<template>
  <q-table
    class="my-sticky-headers"
    bordered
    flat
    :rows="marketSentimentData"
    :columns="marketColumns"
    style="height: 450px"
    row-key="tweet"
    :no-data-label="noDataMessage"
    binary-state-sort
    wrap-cells
    :visible-columns="['tweet']"
    virtual-scroll
    :rows-per-page-options="[0]"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <template v-for="col in props.cols" :key="col.name">
          <q-td
            :style="dynamicColor(props)"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </template>
      </q-tr>
    </template>
    <template v-slot:top>
      <div class="q-table__title text-subtitle2">Market sentiment Forecast - <span :style="marketSentiment == 'Bullish' ? 'color:#00B746;' : 'color:#EF403C'">{{marketSentiment}}</span></div>
    </template>
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
  </q-table>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "marketSentimentTable",
  data() {
    return {
      marketColumns: [
        {
          name: "sentiment",
          align: "center",
          label: "Sentiment",
          field: "sentiment",
          sortable: true,
        },
        {
          name: "tweet",
          align: "left",
          label: "Tweet",
          field: "tweet",
          sortable: false,
        },
      ],
    };
  },
  computed: {
    ...mapState('stockPricePrediction', ['marketSentimentData', 'marketSentimentForecast', 'marketSentiment']),
  },
  methods: {
    ...mapActions('stockPricePrediction', ['fetchSentimentForecast']),
    dynamicColor(props) {
      if (props.row.sentiment == 'Bullish') {
        return 'color:#00B746'
      } else if (props.row.sentiment == 'Bearish') {
        return 'color:#EF403C'
      } else {
        return 'color:#6D757A'
      }
    },
  },

};
</script>

<style lang="sass">
.my-sticky-headers
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>
