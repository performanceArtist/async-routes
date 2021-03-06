export function loginRequest(username: string, password: string) {
  return {
    type: 'LOGIN_REQUEST',
    payload: { username, password }
  } as const;
}

export function loginSuccess() {
  return {
    type: 'LOGIN_SUCCESS'
  } as const;
}

export function loginFailure(error: string) {
  return {
    type: 'LOGIN_FAILURE',
    payload: error
  } as const;
}

export function checkAuthRequest() {
  return {
    type: 'CHECK_AUTH_REQUEST'
  } as const;
}

export function checkAuthFailure(error: string) {
  return {
    type: 'CHECK_AUTH_FAILURE',
    payload: error
  } as const;
}

export function checkAuthSuccess(user: { username: string }) {
  return {
    type: 'CHECK_AUTH_SUCCESS',
    payload: user
  } as const;
}

export function fetchUserDataRequest() {
  return {
    type: 'FETCH_USER_DATA_REQUEST'
  } as const;
}

export function fetchUserDataFailure(error: string) {
  return {
    type: 'FETCH_USER_DATA_FAILURE',
    payload: error
  } as const;
}

export function fetchUserDataSuccess(todos: string[]) {
  return {
    type: 'FETCH_USER_DATA_SUCCESS',
    payload: todos
  } as const;
}

export function logout() {
  return {
    type: 'LOGOUT'
  } as const;
}

export function resetState() {
  return {
    type: 'RESET_STATE'
  } as const;
}

type ActionCreators = { [key: string]: (...args: any) => object };
type ActionTypes<T extends ActionCreators> = ReturnType<T[keyof T]>;
const actions = {
  loginRequest,
  loginSuccess,
  loginFailure,
  checkAuthRequest,
  checkAuthSuccess,
  checkAuthFailure,
  fetchUserDataRequest,
  fetchUserDataSuccess,
  fetchUserDataFailure,
  logout,
  resetState
};

export type Actions = ActionTypes<typeof actions>;
export type PickByType<K extends Actions['type']> = Extract<Actions, { type: K }>;
