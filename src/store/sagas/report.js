import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/report';
import { callApi } from 'store/sagas/auth';

function* getReportOrder({ payload }) {
  try {
    const { date_start, date_end } = payload;
    const response = yield call(api.get, '/v1/admin/reports/orders', {
      date_start,
      date_end,
    });
    yield put(Creators.getReportOrderSuccess(response.data));
  } catch (err) {
    yield put(Creators.getReportOrderFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* reportSaga() {
  yield all([takeLatest(Types.GET_ORDER_REQUEST, getReportOrder)]);
}
