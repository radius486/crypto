export const userList = state => state.userList;

export const activeUser = (state, getters) => getters.userList && getters.userList[0];

export const userId = state => state.userId;

