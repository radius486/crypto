<template>
<transition name='v-modal_fade'>
<div class='v-modal'
  v-if='show'
  v-focus
  tabindex='0'
  @click='close'
  @keyup.esc='close'
  @mousedown='setInsideClick(false)'
  >
    <div class='v-modal__container'
      @click.stop
      @mousedown.stop='setInsideClick(true)'
      @mouseup.stop='setInsideClick(false)'
      >
      <h3 class='v-modal__header'> {{ title }} </h3>
      <div class='v-modal__body'>
        <slot name='body'></slot>
      </div>
      <div class='v-modal__actions'>
        <slot name='actions'></slot>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
export default {
  name: 'VModal',
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      insideClick: false,
    };
  },
  methods: {
    close() {
      if (this.insideClick) return;

      this.$emit('close');
    },
    setInsideClick(val) {
      this.insideClick = val;
    },
  },
};
</script>
<style script>
.v-modal {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(33, 33, 32, 0.3);
  display: flex;
  transition: opacity 0.3s ease;
  justify-content: center;
  align-items: center;
}

.v-modal__container {
  min-width: 280px;
  min-height: 200px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 25px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  font-family: 'Open Sans', sans-serif;
}

.v-modal_fade-enter-active,
.v-modal_fade-leave-active {
  transition: opacity 0.3s;
}

.v-modal_fade-enter,
.v-modal_fade-leave-to {
  opacity: 0;
}

.v-modal__header {
  margin-top: 0;
  margin-bottom: 15px;
  color: #5e5e5e;
  font-size: 20px;
  font-weight: bold;
}

.v-modal__body {
  margin-bottom: 15px;
}

.v-modal__actions {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}

.v-modal__button {
  margin-left: 5px;
}
</style>
