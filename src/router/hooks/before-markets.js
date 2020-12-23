import store from '../../store';

export default async (to, from, next) => {
  try {
    await store.dispatch('users/fetchUsers');
    // await store.dispatch('markets/fetchUsdMarkets');

    next();
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  }
};
