import store from '../../store';

export default async (to, from, next) => {
  try {
    if (store.getters['users/userId']) next({ name: 'Home' });
    else next();
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  }
};

