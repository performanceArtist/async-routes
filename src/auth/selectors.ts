import { AppReduxState } from 'shared/types';

export function selectLoginComm(state: AppReduxState) {
  return state.login;
}

export function selectCheckAuthComm(state: AppReduxState) {
  return state.checkAuth;
}

export function selectUser(state: AppReduxState) {
  return state.user;
}
