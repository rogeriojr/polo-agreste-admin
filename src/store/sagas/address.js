import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/address';
import { callApi } from 'store/sagas/auth';

function* getAddressValidate({ payload }) {
  try {
    const { code_post } = payload;
    const request = call(api.get, '/v1/client/address/validate', {
      code_post,
    });
    const response = yield call(callApi, request);
    yield put(Creators.getAddressValidateSuccess(response.data));
  } catch (err) {
    yield put(Creators.getAddressValidateFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* addressSaga() {
  yield all([takeLatest(Types.GET_VALIDATE_REQUEST, getAddressValidate)]);
}
