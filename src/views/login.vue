<template>
  <div class='login-container'>
    <h1>Войти</h1>
    <div class='input-container'>
      <label for='username'>Имя пользователя</label>
      <input @keyup.enter='login' id='username' type='text' v-model='username' />
    </div>
    <div class='input-container'>
      <label for='password'>Пароль</label>
      <input @keyup.enter='login' id='password' type='password' v-model='password' />
    </div>
    <button @click.prevent='login'>Войти</button>
    <strong v-if="$store.getters['users/error']" class='error'>
      Error: {{ $store.getters['users/error'] }}
    </strong>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: null,
      password: null,
    };
  },
  computed: {
  },
  methods: {
    async login() {
      const payload = {
        username: this.username,
        password: this.password,
      };

      await this.$store.dispatch('users/login', payload);

      if (this.$store.getters['users/userId']) {
        this.$router.push('/');
      }

      this.username = null;
      this.password = null;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-container {
  width: 800px;
  margin: 0 auto;
  text-align: left;
}
.input-container {
  margin-bottom: 15px;
}
.input-container label {
  display: block;
  margin-bottom: 5px;
}
.error {
  color: #f00;
  display: block;
  font-size: 20px;
  margin-top: 20px;
}
</style>
