import { AppReduxState } from 'shared/types';

export function selectLoginComm(state: AppReduxState) {
  return state.login;
}

export function selectCheckAuthComm(state: AppReduxState) {
  return state.checkAuth;
}

export function selectFetchUserDataComm(state: AppReduxState) {
  return state.fetchUserData;
}

export function selectUser(state: AppReduxState) {
  return state.user;
}

export function selectTodos(state: AppReduxState) {
  return state.todos;
}
