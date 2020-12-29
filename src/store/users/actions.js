import * as queries from './queries';

// export async function fetchUsers({ commit }) {
//   try {
//     const userList = await queries.getUserList();
//
//     commit('SET_USER_LIST', userList);
//   } catch (error) {
//     // eslint-disable-next-line
//     console.error(error);
//   }
// }

export async function getUserData({ commit, getters }) {
  const { userId } = getters;

  if (userId) {
    try {
      const activeUser = await queries.getUserData(userId);

      commit('SET_USER_DATA', activeUser);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }
}

export async function updateUserData({ dispatch, getters }, user) {
  const { userId } = getters;

  try {
    await queries.updateUserData(userId, user);

    dispatch('getUserData');
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
}

export async function login({ commit }, payload) {
  try {
    const userId = await queries.login(payload);

    if (!userId) {
      const error = 'Неправильное имя пользователя или пароль';

      commit('SET_USER_ERROR', error);
    } else {
      commit('SET_USER_ID', userId);
      localStorage.setItem('userId', userId);
    }
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
}

export async function logout({ commit }) {
  try {
    await localStorage.removeItem('userId');
    commit('RESET_USER');
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
}
