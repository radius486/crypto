<template>
  <div class='market-container'>
    <div class='market-table'>
      <div class='market-table__row'>
        <div class='market-table__column'>Валюта</div>
        <div class='market-table__column'>В эквиваленте</div>
        <div class='market-table__column'>В долларах США</div>
      </div>
      <div class='market-table__row' v-for='(currency, index) in currencies' :key='index'>
        <div class='market-table__column'>{{ currency.code }}</div>
        <div class='market-table__column'>{{ currency.quantity }}</div>
        <div class='market-table__column'>{{ calculateTotalUsdPrice(currency) }}</div>
      </div>
    </div>
    <pre>{{ activeUser }}</pre>
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
      user: {
        currencies: [],
      },
      updateData: null,
    };
  },
  computed: {
    activeUser() {
      return this.$store.getters['users/activeUser'];
    },
    currencies() {
      return this.$store.getters['users/activeUser'].currencies;
    },
  },
  methods: {
    calculateTotalUsdPrice({ code, quantity }) {
      const pairLabel = `${code}/USD`;
      const pair = this.$store.getters['markets/mainUsdMarket'].find(item => item.Label === pairLabel);
      const price = pair && pair.Price;

      return price && Math.round(price * quantity * 100) / 100;
    },
  },
  created() {
    const { currencies } = this.$store.getters['users/activeUser'];

    const user = {
      currencies,
    };

    Object.assign(this.user, user);

    this.updateData = setInterval(() => {
      // this.$store.dispatch('markets/fetchUsdMarkets');
    }, 300000);
  },
  destroyed() {
    clearInterval(this.updateData);
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
