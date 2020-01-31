import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/virtualCatalog';
import { callApi } from 'store/sagas/auth';

import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';
import fileDownload from 'js-file-download';

function* getVirtualCatalog({ payload }) {
  try {
    const { id } = payload;
    const request = call(api.get, `/v1/admin/virtual/catalogs/${id}`);
    const response = yield call(callApi, request);
    yield put(Creators.getVirtualCatalogSuccess(response.data));
  } catch (err) {
    yield put(Creators.getVirtualCatalogFailure('Erro ao buscar na API'));
  }
}

function* getVirtualCatalogGenerate({ payload }) {
  try {
    const { id, name } = payload;
    const request = yield call(
      api.get,
      `/v1/admin/virtual/catalogs/${id}/generate`,
      {},
      {
        responseType: 'blob',
      },
    );
    const response = yield call(callApi, request);
    yield put(Creators.getVirtualCatalogGenerateSuccess({ id }));
    const contentType = response.headers['content-type'];
    yield call(fileDownload, response.data, `${name}.pdf`, contentType);
  } catch (err) {
    yield put(
      Creators.getVirtualCatalogGenerateFailure('Erro ao buscar na API'),
    );
  }
}

function* getVirtualCatalogImageUpload(payload) {
  try {
    const { id, image_data } = payload;
    const data = new FormData();
    data.append('image', image_data);
    const request = yield call(
      api.post,
      `/v1/admin/virtual/catalogs/${id}/images`,
      data,
    );
    const response = yield call(callApi, request);
    return true;
  } catch (err) {
    return false;
  }
}

function* getVirtualCatalogInsert({ payload }) {
  try {
    const { name, categories, products, store, image_data } = payload;
    const request = call(api.post, '/v1/admin/virtual/catalogs', {
      name,
      categories,
      products,
      store,
    });
    const response = yield call(callApi, request);
    const { id } = response.data.data;
    if (typeof image_data === 'object' && image_data instanceof File) {
      const imageUpload = yield getVirtualCatalogImageUpload({
        id,
        image_data,
      });
    }
    yield put(Creators.getVirtualCatalogInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/virtual/catalogs/update/${id}`));
  } catch (err) {
    yield put(Creators.getVirtualCatalogInsertFailure('Erro ao buscar na API'));
  }
}

function* getVirtualCatalogUpdate({ payload }) {
  try {
    const { id, name, categories, products, store, image_data } = payload;
    const request = call(api.put, `/v1/admin/virtual/catalogs/${id}`, {
      name,
      categories,
      products,
      store,
    });
    const response = yield call(callApi, request);
    if (typeof image_data === 'object' && image_data instanceof File) {
      const imageUpload = yield getVirtualCatalogImageUpload({
        id,
        image_data,
      });
    }
    yield put(Creators.getVirtualCatalogUpdateSuccess());
    yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  } catch (err) {
    yield put(Creators.getVirtualCatalogUpdateFailure('Erro ao buscar na API'));
  }
}

function* getVirtualCatalogDelete({ payload }) {
  try {
    const { id } = payload;
    const request = call(api.delete, `/v1/admin/virtual/catalogs/${id}`);
    const response = yield call(callApi, request);
    yield put(Creators.getVirtualCatalogDeleteSuccess());
    // Remove a categoria deletada da lista
    const { virtualCatalogList, virtualCatalogListTotal } = yield select(
      state => state.virtualCatalog,
    );

    yield put(
      Creators.getVirtualCatalogListSuccess({
        data: virtualCatalogList.filter(doc => doc.id !== id),
        total: virtualCatalogListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getVirtualCatalogDeleteFailure('Erro ao buscar na API'));
  }
}

function* getVirtualCatalogList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/virtual/catalogs', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getVirtualCatalogListSuccess(response.data));
  } catch (err) {
    if (err.status === 404) {
      yield put(
        Creators.getVirtualCatalogListSuccess({
          total: 0,
          data: [],
        }),
      );
    } else {
      yield put(Creators.getVirtualCatalogListFailure('Erro ao buscar na API'));
    }
    yield put(Notifications.error({ title: err.data.msg }));
  }
}

// Individual exports for testing
export default function* productListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getVirtualCatalog),
    takeLatest(Types.GET_GENERATE_REQUEST, getVirtualCatalogGenerate),
    takeLatest(Types.GET_INSERT_REQUEST, getVirtualCatalogInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getVirtualCatalogUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getVirtualCatalogDelete),
    takeLatest(Types.GET_LIST_REQUEST, getVirtualCatalogList),
  ]);
}
