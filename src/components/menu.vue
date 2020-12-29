<template>
  <div class="menu">
    <div class='link-container'>
      <router-link to='/' :class="linkClass('Home')">Главная</router-link>
      <router-link to='/markets' :class="linkClass('Markets')">Биржи</router-link>
    </div>
    <button class='logout' @click='logout'>Выйти</button>
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
    async logout() {
      await this.$store.dispatch('users/logout');
      this.$router.push('/login');
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
  display: flex;
  justify-content: space-between;
}
a {
  text-decoration: none;
  color: #000;
  text-transform: uppercase;
  margin-right: 10px;
  font-size: 18px;
}
.logout {
}
.active {
  text-decoration: underline;
}
</style>
