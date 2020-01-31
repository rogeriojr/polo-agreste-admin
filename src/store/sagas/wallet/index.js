import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/wallet';
import { callApi } from 'store/sagas/auth';

function* getWallet() {
  try {
    const request = call(api.get, '/v1/admin/wallets', {});
    const response = yield call(callApi, request);
    if (response.status !== 200 && response.status !== 201) throw response;
    yield put(Creators.getWalletSuccess(response.data));
  } catch (err) {
    yield put(Creators.getWalletFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* walletSaga() {
  yield all([takeLatest(Types.GET_WALLET_REQUEST, getWallet)]);
}
