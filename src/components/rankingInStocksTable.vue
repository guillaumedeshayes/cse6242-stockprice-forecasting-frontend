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
// import { mapActions, mapState } from 'vuex'
// import clientBaseSegment from './clientBaseSegment.vue'
// import clientBaseRowDetails from './clientBaseRowDetails.vue'
// :pagination.sync="stocksListPagination"

export default {
  name: "rankingInStocksTable",
  //   components: {
  //     clientBaseRowDetails,
  //     clientBaseSegment,
  //   },
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
    //     ...mapState('data', ['customerDisplayedData', 'customerColumns', 'loadingDB', 'noDataMessage']),
    //     ...mapState('brands', ['brandList', 'storeList', 'rewardList']),
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
  //   methods: {
  //     // ...mapActions('loyalty', ['getFullClientBase', 'filterClientBase']),
  //     ...mapActions('data', ['fetchDataTables']),
  //     ...mapActions('campaigns', ['exportClientsToCampaigns']),
  //     detailRow (e, row) {
  //       console.log(row)
  //       this.rowToDetail = row
  //       this.showDetailsModale = true
  //     },
  //     sortDateFromNow (rows, sortBy, descending) {
  //       const data = [...rows]
  //       if (sortBy === 'lastVisit') {
  //         data.sort((a, b) => {
  //           var dateA = new Date(a.lastVisit)
  //           var dateB = new Date(b.lastVisit)
  //           if (descending) {
  //             return dateA < dateB ? 1 : -1
  //           } else {
  //             return dateA < dateB ? -1 : 1
  //           }
  //         })
  //       }
  //       return data
  //     },
  //     segmentPopup () {
  //       this.showSegmentModale = true
  //     }
  //   },
  //   mounted () {
  //     // this.getFullClientBase()
  //     this.fetchDataTables({row: 'Customer'})
  //   }
};
</script>
