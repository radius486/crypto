<template>
  <div class='currency-pair'>
    {{ pair }}
    {{ index }}
    <button @click.prevent='deletePair'>Удалить</button>
  </div>
</template>

<script>
export default {
  name: 'CurrencyPair',
  props: {
    pair: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    deletePair() {
      this.$emit('delete', this.index);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.currency-pair {
  width: 100%;
}
</style>
