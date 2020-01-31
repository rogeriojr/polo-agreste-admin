import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/bank';
import { callApi } from 'store/sagas/auth';

import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';

function* getBank({ payload }) {
  try {
    const { id } = payload;
    const request = call(api.get, `/v1/admin/banks/${id}`);
    const response = yield call(callApi, request);
    yield put(Creators.getBankSuccess(response.data));
  } catch (err) {
    yield put(Creators.getBankFailure('Erro ao buscar na API'));
  }
}

function* getBankImageUpload(payload) {
  try {
    const { id, image_data } = payload;
    const data = new FormData();
    data.append('image', image_data);
    const response = yield call(api.post, `/v1/admin/banks/${id}/images`, data);
    return true;
  } catch (err) {
    return false;
  }
}

function* getBankInsert({ payload }) {
  try {
    const {
      bank_father,
      description,
      name,
      order_position,
      image_data,
    } = payload;
    const request = call(api.post, '/v1/admin/banks', {
      name,
      order_position,
      description: description.toString('markdown'),
      bank_father,
    });
    const response = yield call(callApi, request);
    const { id } = response.data.data;
    if (typeof image_data === 'object' && image_data instanceof File) {
      const imageUpload = yield getBankImageUpload({ id, image_data });
    }
    yield put(Creators.getBankInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/bank/update/${id}`));
  } catch (err) {
    yield put(Creators.getBankInsertFailure('Erro ao buscar na API'));
  }
}

function* getBankUpdate({ payload }) {
  try {
    const {
      id,
      bank_father,
      description,
      name,
      order_position,
      image_data,
    } = payload;
    const request = call(api.put, `/v1/admin/banks/${id}`, {
      name,
      order_position,
      description: description.toString('markdown'),
      bank_father,
    });
    const response = yield call(callApi, request);
    if (typeof image_data === 'object' && image_data instanceof File) {
      const imageUpload = yield getBankImageUpload({ id, image_data });
    }
    yield put(Creators.getBankUpdateSuccess());
    yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  } catch (err) {
    yield put(Creators.getBankUpdateFailure('Erro ao buscar na API'));
  }
}

function* getBankDelete({ payload }) {
  try {
    const { id } = payload;
    const request = call(api.delete, `/v1/admin/banks/${id}`);
    const response = yield call(callApi, request);
    yield put(Creators.getBankDeleteSuccess());
    // Remove a categoria deletada da lista
    const { bankList, bankListTotal } = yield select(state => state.bank);

    yield put(
      Creators.getBankListSuccess({
        data: bankList.filter(doc => doc.id !== id),
        total: bankListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getBankDeleteFailure('Erro ao buscar na API'));
  }
}

function* getBankList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/banks', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getBankListSuccess(response.data));
  } catch (err) {
    if (err.status === 404) {
      yield put(
        Creators.getBankListSuccess({
          total: 0,
          data: [],
        }),
      );
    } else {
      yield put(Creators.getBankListFailure('Erro ao buscar na API'));
    }
    yield put(Notifications.error({ title: err.data.msg }));
  }
}

// Individual exports for testing
export default function* productListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getBank),
    takeLatest(Types.GET_INSERT_REQUEST, getBankInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getBankUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getBankDelete),
    takeLatest(Types.GET_LIST_REQUEST, getBankList),
  ]);
}
