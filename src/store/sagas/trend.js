import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/trend';
import { callApi } from 'store/sagas/auth';

import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';

function* getTrend({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `/v1/admin/trends/${id}`);
    yield put(Creators.getTrendSuccess(response.data));
  } catch (err) {
    yield put(Creators.getTrendFailure('Erro ao buscar na API'));
  }
}

function* getTrendImagesUpload(payload) {
  try {
    const { id, images_data } = payload;
    for (let i = 0; i < images_data.length; i += 1) {
      const image = images_data[i];
      const data = new FormData();
      data.append('image', image);
      yield call(api.post, `/v1/admin/trends/${id}/images`, data);
    }
    yield put({ type: 'UPLOAD_SUCCESS' });
  } catch (err) {
    yield put({ type: 'UPLOAD_FAILURE' });
  }
}

function* getTrendInsert({ payload }) {
  try {
    const { name, status, products, images_data } = payload;
    const response = yield call(api.post, '/v1/admin/trends', {
      name,
      status,
      products,
    });
    const { id } = response.data.data;
    yield getTrendImagesUpload({ id, images_data });
    yield put(Creators.getTrendInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/trend/update/${id}`));
  } catch (err) {
    yield put(Creators.getTrendInsertFailure('Erro ao buscar na API'));
  }
}

function* getTrendUpdate({ payload }) {
  try {
    const { id, name, status, products, images_data } = payload;
    /* const response =  */ yield call(api.put, `/v1/admin/trends/${id}`, {
      name,
      status,
      products,
    });
    yield getTrendImagesUpload({ id, images_data });
    yield put(Creators.getTrendUpdateSuccess());
    yield put(Creators.getTrendRequest({ id }));
    yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  } catch (err) {
    yield put(Creators.getTrendUpdateFailure('Erro ao buscar na API'));
  }
}

function* getTrendDelete({ payload }) {
  try {
    const { id } = payload;
    /* const response =  */ yield call(api.delete, `/v1/admin/trends/${id}`);
    yield put(Creators.getTrendDeleteSuccess());
    // Remove a categoria deletada da lista
    const { trendList, trendListTotal } = yield select(state => state.trend);

    yield put(
      Creators.getTrendListSuccess({
        data: trendList.filter(doc => doc.id !== id),
        total: trendListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getTrendDeleteFailure('Erro ao buscar na API'));
  }
}

function* getImageTrendDelete({ payload }) {
  try {
    const { id, id_trend } = payload;
    yield call(api.delete, `/v1/admin/trends/${id_trend}/images/${id}`);
    yield put(Creators.getImageTrendDeleteSuccess());
  } catch (err) {
    yield put(Creators.getImageTrendDeleteFailure('Erro ao buscar na API'));
  }
}

function* getTrendList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/trends', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getTrendListSuccess(response.data));
  } catch (err) {
    yield put(Creators.getTrendListFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* trendListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getTrend),
    takeLatest(Types.GET_INSERT_REQUEST, getTrendInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getTrendUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getTrendDelete),
    takeLatest(Types.GET_IMAGE_DELETE_REQUEST, getImageTrendDelete),
    takeLatest(Types.GET_LIST_REQUEST, getTrendList),
  ]);
}
