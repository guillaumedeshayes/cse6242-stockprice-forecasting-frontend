<template>
  <q-table
    :rows="stockDisplayedData"
    :columns="stockColumns"
    row-key="stock"
    bordered
    flat
    :no-data-label="noDataMessage"
    binary-state-sort
    :visible-columns="[
      'stock',
      'companyName',
      'prevClosePrice',
      'predClosePrice',
      'increase',
    ]"
  >
    <template v-slot:top>
      <div class="q-table__title text-subtitle2">
        Other close price predictions
      </div>
    </template>
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
  </q-table>
</template>

<script>
export default {
  name: "rankingInStocksTable",
  data() {
    return {
      stocksListPagination: {
        sortBy: "predClosePrice",
        descending: false,
        rowsPerPage: 10,
      },
      stockDisplayedData: [
        {
          stock: "AAPL",
          companyName: "Apple",
          prevClosePrice: 174.31,
          predClosePrice: 173.12,
        },
        {
          stock: "AMZN",
          companyName: "Amazon",
          prevClosePrice: 3271.2,
          predClosePrice: 3282.36,
        },
        {
          stock: "NVDA",
          companyName: "NVDIA",
          prevClosePrice: 267.12,
          predClosePrice: 268.19,
        },
        {
          stock: "NFLX",
          companyName: "Netflix",
          prevClosePrice: 373.47,
          predClosePrice: 372.45,
        },
        {
          stock: "PYPL",
          companyName: "Paypal",
          prevClosePrice: 116.67,
          predClosePrice: 118.13,
        },
      ],
      stockColumns: [
        {
          name: "stock",
          align: "center",
          label: "Stock",
          field: "stock",
          sortable: true,
        },
        {
          name: "companyName",
          align: "center",
          label: "Company",
          field: "companyName",
          sortable: false,
        },
        {
          name: "prevClosePrice",
          align: "center",
          label: "Previous price ($)",
          field: "prevClosePrice",
          sortable: false,
        },
        {
          name: "predClosePrice",
          align: "center",
          label: "Predicted price ($)",
          field: "predClosePrice",
          sortable: true,
        },
        {
          name: "increase",
          label: "Increase (%)",
          align: "center",
          field: "increase",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    stockDisplayedDataWithIncrease() {
      var list = [];
      this.stockDisplayedData.forEach((e) => {
        list.append({
          ...e,
          increase:
            (e.predClosePrice - e.prevClosePrice / e.prevClosePrice) * 100,
        });
      });
      return list;
    },
  },
};
</script>
