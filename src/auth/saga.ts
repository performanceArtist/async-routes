import { takeLatest, delay, put, all } from 'redux-saga/effects';

import {
  loginSuccess,
  loginFailure,
  checkAuthSuccess,
  checkAuthFailure,
  PickByType
} from './actions';

type LoginRequest = PickByType<'LOGIN_REQUEST'>;
const loginRequestType: LoginRequest['type'] = 'LOGIN_REQUEST';

function* loginWorker({ payload }: LoginRequest) {
  try {
    yield delay(1000);
    const { username, password } = payload;
    if (username !== 'test' || password !== 'test') {
      throw new Error('Wrong credentials');
    }
    localStorage.setItem('token', 'token');
    yield put(loginSuccess({ username: 'username' }));
  } catch (error) {
    yield put(loginFailure(error.toString()));
  }
}

function* loginWatcher() {
  yield takeLatest(loginRequestType, loginWorker);
};

type CheckAuthRequest = PickByType<'CHECK_AUTH_REQUEST'>;
const checkAuthRequestType: CheckAuthRequest['type'] = 'CHECK_AUTH_REQUEST';

function* checkAuthWorker({ payload }: CheckAuthRequest) {
  try {
    yield delay(1000);
    const { token } = payload;
    if (token !== 'token') {
      throw new Error('Wrong token');
    }
    yield put(checkAuthSuccess({ username: 'username' }));
  } catch (error) {
    yield put(checkAuthFailure(error.toString()));
  }
}

function* checkAuthWatcher() {
  yield takeLatest(checkAuthRequestType, checkAuthWorker);
};

export function* rootSaga() {
  yield all([
    loginWatcher(),
    checkAuthWatcher()
  ]);
}
