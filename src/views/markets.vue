<template>
  <div class='market-container'>
    <div class='market-table'>
      <div class='market-table__row'>
        <div class='market-table__column'>Валюта</div>
        <div class='market-table__column'>В эквиваленте</div>
        <div class='market-table__column'>В долларах</div>
      </div>
      <div class='market-table__row' v-for='(currency, index) in currencies' :key='index'>
        <div class='market-table__column'>{{ currency.code }}</div>
        <div class='market-table__column'>{{ currency.quantity }}</div>
        <div class='market-table__column'></div>
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
        _id: null,
        currencies: [],
      },
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
  },
  created() {
    const { _id, currencies } = this.$store.getters['users/activeUser'];

    const user = {
      _id,
      currencies,
    };

    Object.assign(this.user, user);
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
