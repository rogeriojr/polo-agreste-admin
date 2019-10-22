import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/address';
import { callApi } from 'store/sagas/auth';

function* getAddressValidate({ payload }) {
  try {
    const { code_post } = payload;
    const response = yield call(api.get, '/v1/cliente/address/validate', {
      code_post,
    });
    yield put(Creators.getAddressValidateSuccess(response.data));
  } catch (err) {
    yield put(Creators.getAddressValidateFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* productListSaga() {
  yield all([takeLatest(Types.GET_VALIDATE_REQUEST, getAddressValidate)]);
}
