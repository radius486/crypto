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
        <div class='currency-pair__column' title='Средневзвешенный курс'>{{ averagePrice }}</div>
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
            <span>{{ pair.oldQuantity }}</span>
            <span>{{ currencyCode }}</span>
          </div>
        </div>
      </div>
    </div>
    <button class='delete-button' @click.prevent='deletePair'>Удалить</button>
    <v-modal
      class='transaction-modal'
      :show='showModal'
      :title='modalTitle'
      @click.native='closeModal'
      @keyup.native.esc='closeModal'
    >
      <template #body>
        <div class='transaction-modal__block'>
          <label for='transaction-quantity'>Количество</label>
          <input id='transaction-quantity' type='text' v-model='transactionQuantity'>
        </div>
        <div class='transaction-modal__block'>
          <label for='transaction-price'>Цена</label>
          <input id='transaction-price' type='text' v-model='transactionPrice'>
        </div>
      </template>
      <template #actions>
        <button @click.prevent='closeModal'>Отменить</button>
        <button v-if="method === 'buy'" @click.prevent='buyCurrency()'>Купить</button>
        <button v-if="method === 'sell'" @click.prevent='sellCurrency()'>Продать</button>
      </template>
    </v-modal>
  </div>
</template>

<script>
import VModal from '@/components/v-modal';

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
  components: {
    VModal,
  },
  data() {
    return {
      newQuantity: 10,
      showModal: false,
      transactionQuantity: null,
      transactionPrice: null,
      method: null,
    };
  },
  computed: {
    oldPrice() {
      return this.pair.Price - (this.pair.Price * 0.1);
    },
    averagePrice() {
      // const price = ((this.oldQuantity * this.oldPrice) + (this.newQuantity * this.pair.Price))
      //   / (this.oldQuantity + this.newQuantity);
      // console.log(price);

      // const value = this.oldPrice + ((this.pair.Price - this.oldPrice)
      //   / (this.newQuantity / this.oldQuantity));

      // console.log(value);
      return this.pair.averagePrice;
    },
    pairStatus() {
      if (this.coursePercent < -1.5) {
        return 'buy';
      }

      if (this.coursePercent > 1.5) {
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
    modalTitle() {
      const text = this.method === 'buy' ? 'Купить' : 'Продать';
      return `${text} ${this.currencyCode}`;
    },
  },
  methods: {
    deletePair() {
      this.$emit('delete', this.index);
    },
    openModal(method) {
      this.showModal = true;
      this.method = method;
    },
    closeModal() {
      this.showModal = false;
      this.resetData();
    },
    resetData() {
      this.method = null;
      this.transactionQuantity = null;
      this.transactionPrice = null;
    },
    async buyCurrency() {
      const data = {
        averagePrice: Number(this.transactionPrice),
        quantity: Number(this.transactionQuantity),
        code: this.currencyCode,
        label: this.pair.Label,
        index: this.index,
      };

      await this.$emit('buy', data);
      this.closeModal();
    },
    async sellCurrency() {
      const data = {
        averagePrice: Number(this.transactionPrice),
        quantity: Number(this.transactionQuantity),
        code: this.currencyCode,
        label: this.pair.Label,
        index: this.index,
      };

      await this.$emit('sell', data);
      this.closeModal();
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
.delete-button {
  margin-top: 10px;
}
.currency-pair__table input[type='text'] {
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
.currency-pair__table input[type='text']:focus {
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
  justify-content: space-between;
}
.course-percent {
  font-size: 18px;
  padding: 0 5px;
  font-weight: bold;
}
.transaction-modal__block {
  margin-bottom: 15px;
}
.transaction-modal__block label {
  display: block;
}
.transaction-modal__block input {
  width: 100%;
  box-sizing: border-box;
}
</style>
