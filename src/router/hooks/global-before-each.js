import store from '../../store';

export default async (to, from, next) => {
  try {
    if (to.name !== 'Login' && !store.getters['users/userId']) next({ name: 'Login' });
    else next();
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  }
};
