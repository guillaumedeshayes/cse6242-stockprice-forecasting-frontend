<template>
  <q-card class="my-card" flat bordered>
    <q-card-section class="q-py-xs row justify-between items-center">
      <div>
        <div class="text-subtitle2">Model <b>accuracy</b></div>
      </div>
    </q-card-section>
    <q-card-section v-if="!loading" class="q-pt-xs column items-center">
      <div class="text-h4 q-mb-xs">{{ curr }} %</div>
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
export default {
  name: "b-figure-nbclaimedrewards",
  props: ['confidence'],
  computed: {
    curr () {
      console.log('Curr', this.confidence);
      return this.confidence;
    },
    prev() {
      return this.confidence - 7;
    },
    variation() {
      var variation = (
        ((Number(this.curr) - Number(this.prev)) * 100) /
        Number(this.prev)
      ).toFixed(1);
      if (variation == "NaN" || variation == "Infinity") {
        return "Error";
      } else {
        return `${variation} %`;
      }
    },
    increase() {
      return Number(this.variation.split(" %")[0]) >= 0;
    },
  },
};
</script>
