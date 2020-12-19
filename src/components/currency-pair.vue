<template>
  <div class='currency-pair'>
    <div class='currency-pair__table'>
      <div class='currency-pair__row'>
        <div class='currency-pair__column'>{{ pair.Label }}</div>
        <div class='currency-pair__column'></div>
        <div class='currency-pair__column' title='Новый курс'>{{ pair.Price }}</div>
        <div class='currency-pair__column buy'>
          <button class='button__buy' @click.prevent="openModal('buy')">Купить</button>
        </div>
      </div>
      <div class='currency-pair__row'>
        <div class='currency-pair__column' :class='pairStatus'>{{ pairStatusText }}</div>
        <div class='currency-pair__column course-percent'>{{ coursePercentText }}</div>
        <div class='currency-pair__column' title='Средневзвешенный курс'>
          <input type='text' v-model='averagePrice'>
        </div>
        <div class='currency-pair__column sell'>
          <button class='button__sell' @click.prevent="openModal('sell')">Продать</button>
        </div>
      </div>
      <div class='currency-pair__row'>
        <div class='currency-pair__column'></div>
        <div class='currency-pair__column'></div>
        <div class='currency-pair__column'></div>
        <div class='currency-pair__column' title='Старое количество'>
          <div class='currency-code'>
            <input type='text' v-model='oldQuantity'>
            {{ currencyCode }}
          </div>
        </div>
      </div>
    </div>
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
      newQuantity: 10,
      oldQuantity: 20,
    };
  },
  computed: {
    oldPrice() {
      return this.pair.Price - (this.pair.Price * 0.1);
    },
    averagePrice() {
      const price = ((this.oldQuantity * this.oldPrice) + (this.newQuantity * this.pair.Price))
        / (this.oldQuantity + this.newQuantity);
      console.log(price);

      // const value = this.oldPrice + ((this.pair.Price - this.oldPrice)
      //   / (this.newQuantity / this.oldQuantity));

      // console.log(value);
      return price;
    },
    pairStatus() {
      if (this.averagePrice > this.pair.Price + ((this.pair.Price / 100) * 1.5)) {
        return 'buy';
      }

      if (this.averagePrice < this.pair.Price + ((this.pair.Price / 100) * 1.5)) {
        return 'sell';
      }

      return 'wait';
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
      return ((this.pair.Price / this.averagePrice) * 100) - 100;
    },
    coursePercentText() {
      const percent = Math.round(this.coursePercent * 100) / 100;

      return this.coursePercent > 0 ? `+${percent}%` : `${percent}%`;
    },
  },
  methods: {
    deletePair() {
      this.$emit('delete', this.index);
    },
    openModal(method) {
      // TODO: open modal
      console.log(method);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.currency-pair {
  width: 100%;
  margin-bottom: 20px;
}
.currency-pair__table {
  border-top: 2px solid #000;
  border-left: 2px solid #000;
}
.currency-pair__row {
  display: flex;
}
.currency-pair__column {
  flex-basis: 25%;
  padding: 5px;
  border-bottom: 2px solid #000;
  border-right: 2px solid #000;
  box-sizing: border-box;
}
.button__buy,
.button__sell {
  border: none;
  background: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: none;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  text-align: left;
}
button {
  margin-top: 10px;
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
  width: 50%;
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
