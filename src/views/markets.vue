<template>
  <div class='market-container'>
    <div class='market-table'>
      <div class='market-table__row'>
        <div class='market-table__column'>Валюта</div>
        <div class='market-table__column'>В эквиваленте</div>
        <div class='market-table__column'>В долларах</div>
      </div>
      <div class='market-table__row' v-for='(currency, index) in currencies' :key='index'>
        <div class='market-table__column'>{{ currency.label }}</div>
        <div class='market-table__column'>{{ currency.quantity }}</div>
        <div class='market-table__column'></div>
      </div>
    </div>
    {{ activeUser }}
  </div>
</template>

<script>
// import CurrencyPair from '@/components/currency-pair';
// import axios from 'axios';

export default {
  name: 'Markets',
  components: {
  },
  data() {
    return {
      currencies: [
        {
          label: 'BTC',
          quantity: 30,
        },
        {
          label: 'ETH',
          quantity: 15,
        },
        {
          label: 'BCH',
          quantity: 10,
        },
        {
          label: 'ETC',
          quantity: 20,
        },
      ],
    };
  },
  computed: {
    activeUser() {
      return this.$store.getters['users/activeUser'];
    },
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.market-container {
  width: 800px;
  margin: 0 auto;
  text-align: left;
}
.market-table {
  border-top: 2px solid #000;
  border-left: 2px solid #000;
}
.market-table__row {
  display: flex;
}
.market-table__column {
  flex-basis: 33.3%;
  padding: 5px;
  border-bottom: 2px solid #000;
  border-right: 2px solid #000;
}
</style>
