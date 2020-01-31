import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/scroll';
import { callApi } from 'store/sagas/auth';

import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';
import { imageToBase64 } from 'utils/converters';

function* getScroll({ payload }) {
  try {
    const { id } = payload;
    const request = yield call(api.get, `/v1/admin/scrolls/${id}`);
    const response = yield call(callApi, request);
    yield put(Creators.getScrollSuccess(response.data));
  } catch (err) {
    yield put(Creators.getScrollFailure('Erro ao buscar na API'));
  }
}

function* getScrollInsert({ payload }) {
  try {
    const {
      name,
      route_app,
      status,
      description,
      order_position,
      image_data,
    } = payload;

    const data = {
      name,
      route_app,
      status,
      description: description.toString('markdown'),
      order_position,
    };

    if (image_data) {
      const image = yield call(imageToBase64, image_data);
      data.image = image;
    }

    const request = yield call(api.post, '/v1/admin/scrolls', data);
    const response = yield call(callApi, request);
    const { id } = response.data.data;
    yield put(Creators.getScrollInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/marketing/scrolls/update/${id}`));
  } catch (err) {
    yield put(Creators.getScrollInsertFailure('Erro ao buscar na API'));
  }
}

function* getScrollUpdate({ payload }) {
  try {
    const {
      id,
      name,
      route_app,
      status,
      description,
      order_position,
      image_data,
    } = payload;

    const data = {
      name,
      route_app,
      status,
      description: description.toString('markdown'),
      order_position,
    };

    if (image_data) {
      const image = yield call(imageToBase64, image_data);
      data.image = image;
    }

    const request = yield call(api.put, `/v1/admin/scrolls/${id}`, data);

    const response = yield call(callApi, request);

    yield put(Creators.getScrollUpdateSuccess());
    yield put(Creators.getScrollRequest({ id }));
    yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  } catch (err) {
    yield put(Creators.getScrollUpdateFailure('Erro ao buscar na API'));
  }
}

function* getScrollDelete({ payload }) {
  try {
    const { id } = payload;
    const request = yield call(api.delete, `/v1/admin/scrolls/${id}`);
    const response = yield call(callApi, request);
    yield put(Creators.getScrollDeleteSuccess());
    // Remove a categoria deletada da lista
    const { scrollList, scrollListTotal } = yield select(state => state.scroll);

    yield put(
      Creators.getScrollListSuccess({
        data: scrollList.filter(doc => doc.id !== id),
        total: scrollListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getScrollDeleteFailure('Erro ao buscar na API'));
  }
}

function* getImageScrollDelete({ payload }) {
  try {
    const { id, id_scroll } = payload;
    const request = yield call(
      api.delete,
      `/v1/admin/scrolls/${id_scroll}/images/${id}`,
    );
    const response = yield call(callApi, request);
    yield put(Creators.getImageScrollDeleteSuccess());
  } catch (err) {
    yield put(Creators.getImageScrollDeleteFailure('Erro ao buscar na API'));
  }
}

function* getScrollList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/scrolls', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getScrollListSuccess(response.data));
  } catch (err) {
    if (err.status === 404) {
      yield put(
        Creators.getScrollListSuccess({
          total: 0,
          data: [],
        }),
      );
    } else {
      yield put(Creators.getScrollListFailure('Erro ao buscar na API'));
    }
    yield put(Notifications.error({ title: err.data.msg }));
  }
}

// Individual exports for testing
export default function* scrollListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getScroll),
    takeLatest(Types.GET_INSERT_REQUEST, getScrollInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getScrollUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getScrollDelete),
    takeLatest(Types.GET_IMAGE_DELETE_REQUEST, getImageScrollDelete),
    takeLatest(Types.GET_LIST_REQUEST, getScrollList),
  ]);
}
