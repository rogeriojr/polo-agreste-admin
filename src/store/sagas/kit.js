import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/kit';
import { callApi } from 'store/sagas/auth';

import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';

function* getKit({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `/v1/admin/kits/${id}`);
    yield put(Creators.getKitSuccess(response.data));
  } catch (err) {
    yield put(Creators.getKitFailure('Erro ao buscar na API'));
  }
}

function* getKitImagesUpload(payload) {
  try {
    const { id, images_data } = payload;
    for (let i = 0; i < images_data.length; i += 1) {
      const image = images_data[i];
      const data = new FormData();
      data.append('image', image);
      yield call(api.post, `/v1/admin/kits/${id}/images`, data);
    }
    yield put({ type: 'UPLOAD_SUCCESS' });
  } catch (err) {
    yield put({ type: 'UPLOAD_FAILURE' });
  }
}

function* getKitInsert({ payload }) {
  try {
    const {
      name,
      price,
      price_whole,
      date_end,
      status,
      products,
      images_data,
    } = payload;
    const response = yield call(api.post, '/v1/admin/kits', {
      name,
      price,
      price_whole,
      status,
      date_end,
      products,
    });
    const { id } = response.data.data;
    yield getKitImagesUpload({ id, images_data });
    yield put(Creators.getKitInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/kit/update/${id}`));
  } catch (err) {
    yield put(Creators.getKitInsertFailure('Erro ao buscar na API'));
  }
}

function* getKitUpdate({ payload }) {
  try {
    const {
      id,
      name,
      price,
      price_whole,
      date_end,
      status,
      products,
      images_data,
    } = payload;
    /* const response =  */ yield call(api.put, `/v1/admin/kits/${id}`, {
      name,
      price,
      price_whole,
      status,
      date_end,
      products,
    });
    yield getKitImagesUpload({ id, images_data });
    yield put(Creators.getKitUpdateSuccess());
    yield put(Creators.getKitRequest({ id }));
    yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  } catch (err) {
    yield put(Creators.getKitUpdateFailure('Erro ao buscar na API'));
  }
}

function* getKitDelete({ payload }) {
  try {
    const { id } = payload;
    /* const response =  */ yield call(api.delete, `/v1/admin/kits/${id}`);
    yield put(Creators.getKitDeleteSuccess());
    // Remove a categoria deletada da lista
    const { kitList, kitListTotal } = yield select(state => state.kit);

    yield put(
      Creators.getKitListSuccess({
        data: kitList.filter(doc => doc.id !== id),
        total: kitListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getKitDeleteFailure('Erro ao buscar na API'));
  }
}

function* getImageKitDelete({ payload }) {
  try {
    const { id, id_kit } = payload;
    yield call(api.delete, `/v1/admin/kits/${id_kit}/images/${id}`);
    yield put(Creators.getImageKitDeleteSuccess());
  } catch (err) {
    yield put(Creators.getImageKitDeleteFailure('Erro ao buscar na API'));
  }
}

function* getKitList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/kits', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getKitListSuccess(response.data));
  } catch (err) {
    yield put(Creators.getKitListFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* kitListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getKit),
    takeLatest(Types.GET_INSERT_REQUEST, getKitInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getKitUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getKitDelete),
    takeLatest(Types.GET_IMAGE_DELETE_REQUEST, getImageKitDelete),
    takeLatest(Types.GET_LIST_REQUEST, getKitList),
  ]);
}
