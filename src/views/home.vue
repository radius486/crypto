<template>
  <div class='home-container'>
    <button @click.prevent='addPair'>+Добавить валютную пару</button>
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

export default {
  name: 'Home',
  components: {
    CurrencyPair,
  },
  data() {
    return {
      pairs: [],
    };
  },
  methods: {
    addPair() {
      this.pairs.push('currency pair');
    },
    deletePair(index) {
      this.pairs.splice(index, 1);
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
</style>
