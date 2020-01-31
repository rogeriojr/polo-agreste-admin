import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/dashboard';
import { callApi } from 'store/sagas/auth';

function* getDashboard({ payload }) {
  try {
    const { dateStart, dateEnd } = payload;
    const request = yield call(api.get, '/v1/admin/dashboard', {
      date_start: dateStart,
      date_end: dateEnd,
    });
    const response = yield call(callApi, request);
    yield put(Creators.getDashboardSuccess(response.data));
  } catch (err) {
    yield put(Creators.getDashboardFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* dashboardSaga() {
  yield all([takeLatest(Types.GET_REQUEST, getDashboard)]);
}
