<template>
  <div id="app">
    <Menu v-if='showMenu' />
    <router-view/>
  </div>
</template>

<script>
import Menu from '@/components/menu';

export default {
  name: 'App',
  components: {
    Menu,
  },
  computed: {
    showMenu() {
      return !(this.$route.name && this.$route.name.match('Login'));
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
