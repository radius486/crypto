<template>
  <div class='currency-pair'>
    <table>
      <tr>
        <td>{{ pair.Label }}</td>
        <td></td>
        <td title='Новый курс'>{{ pair.Price }}</td>
        <td class='buy'>
          <button @click.prevent="setMethod('buy')">Купить</button>
        </td>
      </tr>
      <tr>
        <td :class='pairStatus'>{{ pairStatusText }}</td>
        <td class='course-percent'>{{ coursePercentText }}</td>
        <td title='Старый курс'>
          <input type='text' v-model='oldPrice'>
        </td>
        <td class='sell'>
          <button @click.prevent="setMethod('sell')">Продать</button>
        </td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td title='Старое количество'>
          <div class='currency-code'>
            <input type='text' v-model='oldQuantity'>
            {{ currencyCode }}
          </div>
        </td>
        <td title='Новое количество'>
          <div class='currency-code'>
            <input type='text' v-model='newQuantity'>
            {{ currencyCode }}
          </div>
        </td>
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
      oldPrice: undefined,
      newQuantity: undefined,
      oldQuantity: undefined,
      method: undefined,
    };
  },
  computed: {
    pairStatus() {
      if (this.method === 'buy') {
        const price = ((this.oldQuantity * this.oldPrice) + (this.newQuantity * this.pair.Price))
          / (this.oldQuantity + this.newQuantity);
        console.log(price);

        if (price > this.pair.Price) {
          return 'buy';
        }

        return 'wait';
      }

      if (this.method === 'sell') {
        const value = this.oldPrice + ((this.pair.Price - this.oldPrice)
          / (this.newQuantity / this.oldQuantity));

        console.log(value);

        if (value > this.oldPrice) {
          return 'sell';
        }

        return 'wait';
      }

      return '';
    },
    pairStatusText() {
      let text;

      switch (this.pairStatus) {
        case 'buy':
          text = 'Покупать';
          break;
        case 'sell':
          text = 'Продавать';
          break;
        case 'wait':
          text = 'Ожидать';
          break;
        default:
          text = '';
      }

      return text;
    },
    currencyCode() {
      return this.pair.Label.split('/')[0];
    },
    coursePercent() {
      if (!this.oldPrice) { return ''; }

      return (this.pair.Price / ((this.oldPrice / 100) * 1)) - 100;
    },
    coursePercentText() {
      if (!this.oldPrice) { return ''; }

      const percent = Math.round(this.coursePercent * 100) / 100;

      return this.coursePercent > 0 ? `+${percent}%` : `${percent}%`;
    },
  },
  methods: {
    deletePair() {
      this.$emit('delete', this.index);
    },
    setMethod(method) {
      this.method = method;
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
  color: #000;
}
input[type='text'] {
  padding: 0;
  font-size: 16px;
  color: #000;
  border:none;
  background-image:none;
  background-color:transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  max-width: 100%;
}
input[type='text']:focus {
  border: 0px;
  border-top-color: transparent !important;
  outline: none;
}
.buy {
  background-color: #a8d08d;
}
.sell {
  background-color: #f4b083;
}
.wait {
  background-color: #ffd966;
}
.currency-code {
  display: flex;
}
.course-percent {
  font-size: 18px;
  padding: 0 5px;
  font-weight: bold;
}
</style>
