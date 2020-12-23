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
      userPairs: [
        {
          label: '8BIT/BTC',
          averagePrice: null,
        },
        {
          label: 'ZZZ/BTC',
          averagePrice: null,
        },
        {
          label: 'ZCH/BTC',
          averagePrice: null,
        },
        {
          label: '0XBTC/BTC',
          averagePrice: null,
        },
      ],
      user: {
        _id: null,
        pairs: [],
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

      return list;
    },
    pairs() {
      if (!this.market) { return []; }

      const data = [];

      this.$store.getters['users/activeUser'].pairs.forEach((pair) => {
        // eslint-disable-next-line
        const currentPair = this.market.find((item) => item.Label === pair.label) || { Label: pair.label };

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
  },
  created() {
    const { _id, pairs } = this.$store.getters['users/activeUser'];

    const user = {
      _id,
      pairs,
    };

    Object.assign(this.user, user);
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
