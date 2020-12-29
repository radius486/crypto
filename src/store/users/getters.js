// export const userList = state => state.userList;

export const activeUser = state => state.activeUser;

export const userId = state => state.userId || localStorage.getItem('userId');

export const error = state => state.error;

