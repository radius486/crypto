<template>
  <div class='home-container'>
    <select v-model='currentPairLabel' class='currency-select'>
      <option v-for='(label, index) in pairList' :key='index'>{{ label }}</option>
    </select>
    <button @click.prevent='addPair'>+Добавить валютную пару</button>
    <button @click.prevent='getData' class='refresh-button'>Обновить данные</button>
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
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    CurrencyPair,
  },
  data() {
    return {
      pairs: [],
      currencyData: null,
      currentPairLabel: null,
      key: '',
    };
  },
  computed: {
    market() {
      return this.currencyData && this.currencyData.Markets && this.currencyData.Markets[0];
    },
    pairList() {
      if (!this.market) { return []; }

      const list = this.market.map(pair => pair.Label);

      return list;
    },
  },
  methods: {
    addPair() {
      const pairLabel = this.currentPairLabel;

      // eslint-disable-next-line
      const currentPair = this.market.find((item) => item.Label === pairLabel);

      this.pairs.push(currentPair);
    },
    deletePair(index) {
      this.pairs.splice(index, 1);
    },
    async getData() {
      try {
        const response = await axios.get(`https://www.worldcoinindex.com/apiservice/v2getmarkets?key=${this.key}&fiat=btc`);
        this.currencyData = response.data;
      } catch (error) {
        throw new Error('Request error');
      }
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
</style>
