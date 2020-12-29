import { initialState } from './state';

// export function SET_USER_LIST(state, userList) {
//   Object.assign(state, { userList });
// }

export function SET_USER_DATA(state, activeUser) {
  Object.assign(state, { activeUser });
}

export function SET_USER_ID(state, userId) {
  Object.assign(state, { userId });
}

export function SET_USER_ERROR(state, error) {
  Object.assign(state, { error });
}

export function RESET_USER(state) {
  Object.assign(state, initialState());
}
