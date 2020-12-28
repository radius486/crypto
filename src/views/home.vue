<template>
  <div class='home-container'>
    <select v-model='currentPairLabel' class='currency-select'>
      <option v-for='(label, index) in pairList' :key='index'>{{ label }}</option>
    </select>
    <button @click.prevent='addPair'>+Добавить валютную пару</button>
    <button @click.prevent='getMarketData' class='refresh-button'>Обновить данные</button>
    <strong v-if="$store.getters['markets/error']" class='error'>
      Error: {{ $store.getters['markets/error'] }}
    </strong>
    <div class='currency-pairs'>
      <CurrencyPair
        v-for='(pair, index) in pairs'
        :pair='pair'
        :key='`currency_pair_${index}_${pairIterator}`'
        :index='index'
        @delete='deletePair'
        @buy='buyCurrency'
        @sell='sellCurrency'
      />
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
      pairIterator: 0,
      currentPairLabel: null,
      user: {
        _id: null,
        pairs: [],
        currencies: [],
      },
    };
  },
  computed: {
    market() {
      return this.$store.getters['markets/mainMarket'];
    },
    pairList() {
      if (!this.market) { return []; }

      const list = this.market.map(pair => pair.Label);

      return list.reduce((accumulator, pair) => {
        if (this.user.pairs.find(item => item.label === pair)) {
          return accumulator;
        }

        return [...accumulator, pair];
      }, []);
    },
    pairs() {
      if (!this.market) { return []; }

      const data = [];

      this.$store.getters['users/activeUser'].pairs.forEach((pair) => {
        const currentPair = this.market.find(item => item.Label === pair.label)
          || { Label: pair.label };

        const code = pair.label.split('/')[0];

        const currency = this.user.currencies.find(item => item.code === code);

        currentPair.oldQuantity = currency && currency.quantity ? currency.quantity : 0;

        currentPair.averagePrice = pair.averagePrice;

        data.push(currentPair);
      });

      return data;
    },
  },
  methods: {
    addPair() {
      if (!this.market || !this.currentPairLabel) { return; }

      this.user.pairs.push({
        label: this.currentPairLabel,
        averagePrice: null,
      });

      this.currentPairLabel = null;

      this.updateUserData();
    },
    deletePair(index) {
      this.user.pairs.splice(index, 1);

      this.updateUserData();
    },
    async getMarketData() {
      await this.$store.dispatch('markets/fetchMarkets');
    },
    async updateUserData() {
      await this.$store.dispatch('users/updateUserData', this.user);
    },
    buyCurrency(data) {
      const { index, averagePrice, code, quantity, label } = data;

      this.user.pairs[index] = {
        label,
        averagePrice,
      };

      const currencyIndex = this.user.currencies.findIndex(item => item.code === code);

      const currency = {
        code,
        quantity,
      };

      if (currencyIndex > -1) {
        this.user.currencies[currencyIndex] = currency;
      } else {
        this.user.currencies.push(currency);
      }

      this.updateUserData();
    },
    sellCurrency(data) {
      const { index, averagePrice, code, quantity, label } = data;

      this.user.pairs[index] = {
        label,
        averagePrice,
      };

      const currencyIndex = this.user.currencies.findIndex(item => item.code === code);

      const currency = {
        code,
        quantity,
      };

      if (currencyIndex > -1) {
        if (quantity > 0) {
          this.user.currencies[currencyIndex] = currency;
        } else {
          this.user.currencies.splice(currencyIndex, 1);
        }
      } else if (quantity > 0) {
        this.user.currencies.push(currency);
      }

      this.updateUserData();
    },
  },
  created() {
    const { _id, pairs, currencies } = this.$store.getters['users/activeUser'];

    const user = {
      _id,
      pairs,
      currencies,
    };

    Object.assign(this.user, user);
  },
  watch: {
    pairs() {
      this.pairIterator += 1;
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
