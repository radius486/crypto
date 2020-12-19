<template>
  <div class='home-container'>
    <select v-model='currentPairLabel' class='currency-select'>
      <option v-for='(label, index) in pairList' :key='index'>{{ label }}</option>
    </select>
    <button @click.prevent='addPair'>+Добавить валютную пару</button>
    <button @click.prevent='getData' class='refresh-button'>Обновить данные</button>
    <strong v-if='currencyData.error' class='error'>Error: {{ currencyData.error }}</strong>
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
      // currencyData: null,
      currencyData: {
        Markets: [
          [
            { Label: '$AAPL/BTC', Name: '$aapl', Price: 0.00032184, Volume_24h: 0.00000000, Timestamp: 1603273440 },
            { Label: 'YEET/BTC', Name: '$yeet', Price: 0.00078805, Volume_24h: 0.00000000, Timestamp: 1604353440 },
            { Label: '007/BTC', Name: '007coin', Price: 0.00003637, Volume_24h: 0.00000000, Timestamp: 1603802520 },
            { Label: 'ZOC/BTC', Name: '01coin', Price: 0.00000024, Volume_24h: 0.60164324, Timestamp: 1607776080 },
            { Label: 'ZCH/BTC', Name: '0cash', Price: 0.00000003, Volume_24h: 0.00090499, Timestamp: 1607776080 },
            { Label: 'ZCN/BTC', Name: '0chain', Price: 0.00001676, Volume_24h: 15.64889979, Timestamp: 1607776080 },
            { Label: 'ZRX/BTC', Name: '0x', Price: 0.00002098, Volume_24h: 1044.84389557, Timestamp: 1607776080 },
            { Label: '0XBTC/BTC', Name: '0xbitcoin', Price: 100, Volume_24h: 0.00000000, Timestamp: 1594143600 },
            { Label: 'ZXC/BTC', Name: '0xcert', Price: 0.00000012, Volume_24h: 0.39683969, Timestamp: 1607776080 },
            { Label: 'TSHP/BTC', Name: '12ships', Price: 0.00000018, Volume_24h: 142.15341960, Timestamp: 1607776080 },
            { Label: '1AI/BTC', Name: '1aitoken', Price: 0.00000001, Volume_24h: 0.00000000, Timestamp: 1604790180 },
            { Label: 'FST/BTC', Name: '1irstcoin', Price: 0.00004284, Volume_24h: 2.01871817, Timestamp: 1607776080 },
            { Label: '1SG/BTC', Name: '1sg', Price: 0.00000997, Volume_24h: 0.00000000, Timestamp: 1594971960 },
            { Label: '1WO/BTC', Name: '1world', Price: 0.00000434, Volume_24h: 0.52758178, Timestamp: 1607776080 },
            { Label: '1X2/BTC', Name: '1x2coin', Price: 0.00000353, Volume_24h: 0.00000000, Timestamp: 1576457040 },
            { Label: '2BACCO/BTC', Name: '2bacco', Price: 0.00000001, Volume_24h: 0.00000000, Timestamp: 1602409440 },
            { Label: '2KEY/BTC', Name: '2keynetwork', Price: 0.00000093, Volume_24h: 11.93537347, Timestamp: 1607776080 },
            { Label: '2X2/BTC', Name: '2x2', Price: 0.00000002, Volume_24h: 0.00180445, Timestamp: 1607776080 },
            { Label: '300/BTC', Name: '300token', Price: 0.05503372, Volume_24h: 0.00000000, Timestamp: 1547246940 },
            { Label: '3DC/BTC', Name: '3dcoin', Price: 0.00000028, Volume_24h: 0.00000000, Timestamp: 1589355840 },
            { Label: '404/BTC', Name: '404coin', Price: 0.00000032, Volume_24h: 0.00489172, Timestamp: 1607776080 },
            { Label: '42/BTC', Name: '42Coin', Price: 2.85000000, Volume_24h: 0.00000000, Timestamp: 1597098000 },
            { Label: '4ART/BTC', Name: '4art-coin', Price: 0.00000071, Volume_24h: 0.06034359, Timestamp: 1607776080 },
            { Label: 'HIPHOP/BTC', Name: '4hiphop', Price: 0.00000001, Volume_24h: 0.00000000, Timestamp: 1567901880 },
            { Label: 'KWATT/BTC', Name: '4new', Price: 0.00000001, Volume_24h: 0.00000000, Timestamp: 1607758860 },
            { Label: '7E/BTC', Name: '7eleven', Price: 0.00000001, Volume_24h: 0.00000000, Timestamp: 1606756440 },
            { Label: 'SVN/BTC', Name: '7finance', Price: 0.00003858, Volume_24h: 0.00000000, Timestamp: 1607015340 },
            { Label: 'MPH/BTC', Name: '88mph', Price: 0.00198699, Volume_24h: 51.91921620, Timestamp: 1607776080 },
            { Label: '8BIT/BTC', Name: '8bit', Price: 0.00000299, Volume_24h: 0.00000000, Timestamp: 1547448780 },
            { Label: 'NMN/BTC', Name: '99masternodes', Price: 0.00000010, Volume_24h: 0.00005000, Timestamp: 1607776080 },
            { Label: 'AAVE/BTC', Name: 'Aave', Price: 0.00430396, Volume_24h: 5433.56834127, Timestamp: 1607776080 },
          ],
        ],
      },
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
      return this.currencyData && this.currencyData.Markets && this.currencyData.Markets[0];
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
