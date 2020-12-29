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

    commit('SET_USER_ID', userId);
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
}
