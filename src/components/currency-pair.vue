<template>
  <div class='currency-pair'>
    <table>
      <tr>
        <td>{{ pair.Label }}</td>
        <td></td>
        <td>{{ pair.Price }}</td>
        <td>Купить</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>Продать</td>
      </tr>
    </table>
    <button @click.prevent='deletePair'>Удалить</button>
  </div>
</template>

<script>
export default {
  name: 'CurrencyPair',
  props: {
    pair: {
      type: Object,
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
button {
  margin-top: 10px;
}
table {
  width: 100%;
  border-left: 2px solid #000;
  border-bottom: 2px solid #000;
  border-collapse: collapse;
  margin-top: 20px;
}
td {
  width: 25%;
  border-top: 2px solid #000;
  border-right: 2px solid #000;
  padding: 5px;
}
</style>
