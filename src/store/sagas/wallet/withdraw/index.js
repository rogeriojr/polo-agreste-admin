import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/wallet/withdraw';
import { Creators as NotificationCreators } from 'store/ducks/app';

function* getWithdraw({ payload }) {
  try {
    const { amount } = payload;
    const response = yield call(api.post, '/v1/admin/wallets/transfers', { amount });
    if (response.status !== 200 && response.status !== 201) throw response;
    yield put(
      NotificationCreators.openNotification({ message: response.data.msg, type: 'success' })
    );
    yield put(Creators.getWithdrawSuccess(response.data));
  } catch (err) {
    yield put(
      NotificationCreators.openNotification({ message: 'Falha na requisição', type: 'error' })
    );
    yield put(Creators.getWithdrawFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* withdrawSaga() {
  yield all([takeLatest(Types.GET_WITHDRAW_REQUEST, getWithdraw)]);
}
