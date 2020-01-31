import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/stores';
import { callApi } from 'store/sagas/auth';

import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';

function* getStore({ payload }) {
  try {
    const { id } = payload;
    const request = call(api.get, `/v1/admin/stores/${id}`);
    const response = yield call(callApi, request);
    yield put(Creators.getStoreSuccess(response.data));
  } catch (err) {
    yield put(Creators.getStoreFailure('Erro ao buscar na API'));
  }
}

function* getStoreImageUpload(payload) {
  try {
    const { id, image_data } = payload;
    const data = new FormData();
    data.append('image', image_data);
    const response = yield call(api.post, `/v1/admin/stores/${id}/images`, data);
    return true;
  } catch (err) {
    return false;
  }
}

function* getStoreInsert({ payload }) {
  try {
    const {
      name,
      email,
      description,
      cnpj,
      social_name,
      state_register,
      cell_phone,
      cnae,
      website,
      status,
      address,
      manager,
      bank,
      image_data,
      quantity_min_whole,
    } = payload;
    const request = call(api.post, '/v1/admin/stores', {
      name,
      email,
      description: description.toString('markdown'),
      cnpj,
      social_name,
      state_register,
      cell_phone,
      cnae,
      website,
      status,
      address,
      manager,
      bank,
      quantity_min_whole,
    });
    const response = yield call(callApi, request);
    const { id } = response.data.data;
    if (typeof image_data === 'object' && image_data instanceof File) {
      const imageUpload = yield getStoreImageUpload({ id, image_data });
    }
    yield put(Creators.getStoreInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/stores/update/${id}`));
  } catch (err) {
    yield put(Creators.getStoreInsertFailure('Erro ao buscar na API'));
  }
}

function* getStoreUpdate({ payload }) {
  try {
    const {
      id,
      name,
      email,
      description,
      cnpj,
      social_name,
      state_register,
      cell_phone,
      cnae,
      website,
      status,
      address,
      manager,
      bank,
      image_data,
      quantity_min_whole,
    } = payload;
    const request = call(api.put, `/v1/admin/stores/${id}`, {
      name,
      email,
      description: description.toString('markdown'),
      cnpj,
      social_name,
      state_register,
      cell_phone,
      cnae,
      website,
      status,
      address,
      manager,
      bank,
      quantity_min_whole,
    });
    const response = yield call(callApi, request);
    if (typeof image_data === 'object' && image_data instanceof File) {
      const imageUpload = yield getStoreImageUpload({ id, image_data });
    }
    yield put(Creators.getStoreUpdateSuccess());
    yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  } catch (err) {
    yield put(Creators.getStoreUpdateFailure('Erro ao buscar na API'));
  }
}

function* getStoreDelete({ payload }) {
  try {
    const { id } = payload;
    const request = call(api.delete, `/v1/admin/stores/${id}`);
    const response = yield call(callApi, request);
    yield put(Creators.getStoreDeleteSuccess());
    // Remove a categoria deletada da lista
    const { storeList, storeListTotal } = yield select(state => state.store);

    yield put(
      Creators.getStoreListSuccess({
        data: storeList.filter(doc => doc.id !== id),
        total: storeListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getStoreDeleteFailure('Erro ao buscar na API'));
  }
}

function* getStoreList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/stores', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getStoreListSuccess(response.data));
  } catch (err) {
    if (err.status === 404) {
      yield put(
        Creators.getStoreListSuccess({
          total: 0,
          data: [],
        }),
      );
    } else {
      yield put(Creators.getStoreListFailure('Erro ao buscar na API'));
    }
    yield put(Notifications.error({ title: err.data.msg }));
  }
}

// Individual exports for testing
export default function* storeListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getStore),
    takeLatest(Types.GET_INSERT_REQUEST, getStoreInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getStoreUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getStoreDelete),
    takeLatest(Types.GET_LIST_REQUEST, getStoreList),
  ]);
}
