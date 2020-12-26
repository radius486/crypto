import * as queries from './queries';

export async function fetchUsers({ commit }) {
  try {
    const userList = await queries.getUserList();

    commit('SET_USER_LIST', userList);
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
}

export async function getUserData({ commit }, userId) {
  try {
    const activeUser = await queries.getUserData(userId);

    commit('SET_USER_DATA', activeUser);
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
}

export async function updateUserData({ dispatch }, user) {
  const { _id, ...data } = user;

  try {
    await queries.updateUserData(_id, data);

    dispatch('fetchUsers');
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
}
