import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Home from '@/views/home';
import Markets from '@/views/markets';
import Login from '@/views/login';
import beforeHome from './hooks/before-home';
import beforeMarkets from './hooks/before-markets';
import beforeLogin from './hooks/before-login';
import globalBeforeEach from './hooks/global-before-each';

Vue.use(Router);

const router = new Router({
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
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: beforeLogin,
    },
  ],
});

router.beforeEach(globalBeforeEach);

export default router;
