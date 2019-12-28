import { AppReduxState } from 'shared/types';
import { Actions } from './actions';
import { initial } from './initial';

function reducer(state = initial, action: Actions): AppReduxState {
  switch(action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, login: { ...state.login, isRequesting: true }};
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, login: { ...state.login, isRequesting: false } };
    case 'LOGIN_FAILURE':
      return { ...state, user: null, login: { ...state.login, isRequesting: false, error: action.payload } };
    case 'CHECK_AUTH_REQUEST':
        return { ...state, checkAuth: { ...state.checkAuth, isRequesting: true }};
    case 'CHECK_AUTH_SUCCESS':
      return { ...state, user: action.payload, checkAuth: { ...state.checkAuth, isRequesting: false } };
    case 'CHECK_AUTH_FAILURE':
      return { ...state, user: null, checkAuth: { ...state.checkAuth, isRequesting: false, error: action.payload } };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
}

export { reducer };
