<template>
  <q-card class="my-card" flat bordered>
    <q-card-section class="q-py-xs row justify-between items-center">
      <div>
        <!-- <div class="text-caption">Metric</div> -->
        <div class="text-subtitle2">Predicted <b>close price</b></div>
      </div>
    </q-card-section>
    <q-card-section v-if="!loading" class="q-pt-xs column items-center">
      <div class="text-h4 q-mb-xs"><span v-if="typeof(curr) != 'string'">$</span>{{ curr }}</div>
      <div
        v-if="increase"
        class="row justify-between items-center text-positive"
      >
        <q-icon name="expand_less" size="sm" />
        <div class="text-bold">{{ variation }}</div>
      </div>
      <div
        v-if="!increase"
        class="row justify-between items-center text-negative"
      >
        <q-icon v-if="variation !== 'Error'" name="expand_more" size="sm" />
        <div class="text-bold">{{ variation }}</div>
      </div>
    </q-card-section>
    <q-card-section v-else class="q-pt-xs column items-center">
      <q-spinner color="primary" size="3em" />
    </q-card-section>
  </q-card>
</template>

<script>
// import { mapState, mapActions } from "vuex";

export default {
  name: "b-figure-nbclaimedrewards",
  props: ['forecast'],
  // data() {
  //   return {
  //     //   loading: true,
  //     curr: 1560.2,
  //     prev: 1543.63,
  //   };
  // },
  computed: {
    // ...mapState('data', ['b_figure_nbclaimedrewards']),
    curr() {
      return this.forecast;
    },
    prev() {
      if (typeof(this.forecast) == 'string') {
        return this.forecast;
      } else {
        return this.forecast-10;
      }
    },
    variation() {
      if (typeof(this.forecast) == 'string') {
        return 'Error'
      } else {
        var variation = (
          ((Number(this.curr) - Number(this.prev)) * 100) /
          Number(this.prev)
        ).toFixed(1);
        if (variation == "NaN" || variation == "Infinity") {
          return "Error";
        } else {
          return `${variation} %`;
        }
      }
    },
    increase() {
      if (typeof(this.forecast) == 'string') {
        return true
      } else {
        return Number(this.variation.split(" %")[0]) >= 0;
      }
    },
  },
  //   methods: {
  //     ...mapActions('data', ['fetchDataFigures']),
  //   },
  //   async mounted () {
  //     await this.fetchDataFigures({figure: 'nbClaimedRewards'})
  //     this.loading = false
  //   },
};
</script>
