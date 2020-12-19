<template>
  <div class='home-container'>
    <select v-model='currentPairLabel' class='currency-select'>
      <option v-for='(label, index) in pairList' :key='index'>{{ label }}</option>
    </select>
    <button @click.prevent='addPair'>+Добавить валютную пару</button>
    <button @click.prevent='getData' class='refresh-button'>Обновить данные</button>
    <strong v-if="$store.getters['markets/error']" class='error'>
      Error: {{ $store.getters['markets/error'] }}
    </strong>
    <div class='currency-pairs'>
      <template v-for='(pair, index) in pairs'>
        <CurrencyPair
          :pair='pair'
          :key='index'
          :index='index'
          @delete='deletePair'
        />
      </template>
    </div>
  </div>
</template>

<script>
import CurrencyPair from '@/components/currency-pair';
// import axios from 'axios';

export default {
  name: 'Home',
  components: {
    CurrencyPair,
  },
  data() {
    return {
      currentPairLabel: null,
      key: '',
      pairLabels: [
        '8BIT/BTC',
        'ZZZ/BTC',
        'ZCH/BTC',
        '0XBTC/BTC',
      ],
    };
  },
  computed: {
    market() {
      return this.$store.getters['markets/mainMarket'];
    },
    pairList() {
      if (!this.market) { return []; }

      const list = this.market.map(pair => pair.Label);

      return list;
    },
    pairs() {
      if (!this.market) { return []; }

      const data = [];

      this.pairLabels.forEach((Label) => {
        // eslint-disable-next-line
        const currentPair = this.market.find((item) => item.Label === Label) || { Label };

        data.push(currentPair);
      });

      return data;
    },
  },
  methods: {
    addPair() {
      if (!this.market || !this.currentPairLabel) { return; }

      this.pairLabels.push(this.currentPairLabel);
    },
    deletePair(index) {
      this.pairLabels.splice(index, 1);
    },
    async getData() {
      this.$store.dispatch('markets/fetchMarkets');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-container {
  width: 800px;
  margin: 0 auto;
  text-align: left;
}
.currency-select {
  min-width: 200px;
}
.refresh-button {
}
.currency-pairs {
  margin-top: 20px;
}
.error {
  color: #f00;
  display: block;
  font-size: 20px;
  margin-top: 20px;
}
</style>
