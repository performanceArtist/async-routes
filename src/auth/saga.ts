import { takeLatest, delay, put, all } from 'redux-saga/effects';

import {
  loginSuccess,
  loginFailure,
  checkAuthRequest,
  checkAuthSuccess,
  checkAuthFailure,
  fetchUserDataSuccess,
  fetchUserDataFailure,
  resetState,
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
    yield put(loginSuccess());
    yield put(checkAuthRequest());
  } catch (error) {
    yield put(loginFailure(error.toString()));
  }
}

function* loginWatcher() {
  yield takeLatest(loginRequestType, loginWorker);
};

type CheckAuthRequest = PickByType<'CHECK_AUTH_REQUEST'>;
const checkAuthRequestType: CheckAuthRequest['type'] = 'CHECK_AUTH_REQUEST';

function* checkAuthWorker() {
  try {
    yield delay(1000);
    const token = localStorage.getItem('token');
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

type fetchUserDataRequest = PickByType<'FETCH_USER_DATA_REQUEST'>;
const fetchUserDataRequestType: fetchUserDataRequest['type'] = 'FETCH_USER_DATA_REQUEST';

function* fetchUserDataWorker() {
  try {
    yield delay(1000);
    yield put(fetchUserDataSuccess(['Eat', 'Sleep', 'Shrek']));
  } catch (error) {
    yield put(fetchUserDataFailure(error.toString()));
  }
}

function* fetchUserDataWatcher() {
  yield takeLatest(fetchUserDataRequestType, fetchUserDataWorker);
};

function* logoutWorker() {
  localStorage.removeItem('token');
  yield put(resetState());
  yield put(checkAuthRequest());
}

function* logoutWatcher() {
  yield takeLatest('LOGOUT', logoutWorker);
}

export function* rootSaga() {
  yield all([
    loginWatcher(),
    checkAuthWatcher(),
    fetchUserDataWatcher(),
    logoutWatcher()
  ]);
}
