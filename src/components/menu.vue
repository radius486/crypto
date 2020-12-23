<template>
  <div class="menu">
    <router-link to='/' :class="linkClass('Home')">Главная</router-link>
    <router-link to='/markets' :class="linkClass('Markets')">Биржи</router-link>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
    };
  },
  methods: {
    linkClass(to) {
      return this.$route.name && this.$route.name.match(to) ? 'active' : '';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu {
  width: 800px;
  margin: 0 auto;
  text-align: left;
  margin-bottom: 20px;
  font-size: 0px;
}
a {
  text-decoration: none;
  color: #000;
  text-transform: uppercase;
  margin-right: 10px;
  font-size: 18px;
}
.active {
  text-decoration: underline;
}
</style>
