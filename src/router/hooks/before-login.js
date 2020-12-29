// import store from '../../store';

export default async (to, from, next) => {
  try {
    next();
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  }
};

