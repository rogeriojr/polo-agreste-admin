import { call, put, all, takeLatest, select, take } from 'redux-saga/effects';
import { Creators as AuthCreators, Types as AuthTypes } from 'store/ducks/auth';
import { Creators as AuthErrorCreators, Types as AuthErrorTypes } from 'store/ducks/authError';
import { push } from 'connected-react-router';
import { REHYDRATE } from 'redux-persist';

import api from 'services/api';

function* getLogin({ payload: { email, password } }) {
  try {
    yield put(AuthErrorCreators.getAuthErrorRequest());
    yield call(
      api.setHeader,
      'Authorization',
      'b2ZlcnRhcGxheXVzZXI6b2ZlcnRhcGxheXBhc3N3b3Jk',
    );
    const response = yield call(api.post, '/oauth/token', {
      username: email,
      password,
      grant_type: 'password',
    });
    if (response.status !== 200) throw response;
    yield call(
      api.setHeader,
      'Authorization',
      `Bearer ${response.data.access_token}`,
    );
    yield put(AuthCreators.getAuthSuccess(response.data));
    // yield put(LoginCreators.getLoginSuccess());
    yield put(push('/'));
  } catch (err) {
    if (err.status === 401) {
      yield put(AuthCreators.getAuthFailure());
      yield put(
        AuthErrorCreators.getAuthErrorFailure('E-mail e/ou senha incorreto'),
      );
    }
    // yield put(LoginCreators.getLoginFailure(err.data.msg));
  }
}

function* getRefreshToken() {
  const {
    auth: {
      data: { refresh_token },
    },
  } = yield select();
  try {
    yield call(api.setHeader, 'Authorization', `Bearer ${refresh_token}`);
    const response = yield call(api.post, '/oauth/refresh');
    if (response.status !== 200) throw response;
    yield call(
      api.setHeader,
      'Authorization',
      `Bearer ${response.data.access_token}`,
    );
    api.setHeader('Authorization', `Bearer ${response.data.access_token}`);
    yield put(AuthCreators.getLoginRefreshTokenSuccess(response.data));
  } catch (e) {
    if (e.status === 401) {
      yield put(AuthCreators.getLoginRefreshTokenFailure());
    }
  }
}

export function* callApi(apiCall) {
  const response = yield apiCall;
  if (response.status === 201 || response.status === 200) {
    return response;
  }
  yield put(AuthCreators.getLoginRefreshTokenRequest());
  const action = yield take([
    AuthTypes.GET_REFRESH_TOKEN_SUCCESS,
    AuthTypes.GET_REFRESH_TOKEN_FAILURE,
  ]);
  if (action.type === AuthTypes.GET_REFRESH_TOKEN_FAILURE) {
    return response;
  }
  const responseTakeTwo = yield apiCall;
  return responseTakeTwo;
}

function* setApiToken() {
  const { auth } = yield select();
  if (auth.data) {
    yield call(
      api.setHeader,
      'Authorization',
      `Bearer ${auth.data.access_token}`,
    );
  }
}

export default function* AuthSagas() {
  yield all([
    takeLatest(AuthTypes.GET_REQUEST, getLogin),
    takeLatest(AuthTypes.GET_REFRESH_TOKEN_REQUEST, getRefreshToken),
    takeLatest(REHYDRATE, setApiToken),
  ]);
}
