import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Home from '@/views/home';
import Markets from '@/views/markets';
import beforeHome from './hooks/before-home';
import beforeMarkets from './hooks/before-markets';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: beforeHome,
    },
    {
      path: '/markets',
      name: 'Markets',
      component: Markets,
      beforeEnter: beforeMarkets,
    },
  ],
});
