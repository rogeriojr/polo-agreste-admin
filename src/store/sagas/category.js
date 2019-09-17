import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/category';
import { callApi } from 'store/sagas/auth';

import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';

function* getCategory({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `/v1/categories/${id}`);
    yield put(Creators.getCategorySuccess(response.data));
  } catch (err) {
    yield put(Creators.getCategoryFailure('Erro ao buscar na API'));
  }
}

function* getCategoryImageUpload(payload) {
  try {
    const { id, image_data } = payload;
    const data = new FormData();
    data.append('image', image_data);
    const response = yield call(api.post, `/v1/categories/${id}/images`, data);
    return true;
  } catch (err) {
    return false;
  }
}

function* getCategoryInsert({ payload }) {
  try {
    const {
      category_father,
      description,
      name,
      order_position,
      image_data,
    } = payload;
    const response = yield call(api.post, '/v1/categories', {
      name,
      order_position,
      description: description.toString('markdown'),
      category_father,
    });
    const { id } = response.data.data;
    if (typeof image_data === 'object' && image_data instanceof File) {
      const imageUpload = yield getCategoryImageUpload({ id, image_data });
    }
    yield put(Creators.getCategoryInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/category/update/${id}`));
  } catch (err) {
    yield put(Creators.getCategoryInsertFailure('Erro ao buscar na API'));
  }
}

function* getCategoryUpdate({ payload }) {
  try {
    const {
      id,
      category_father,
      description,
      name,
      order_position,
      image_data,
    } = payload;
    const response = yield call(api.put, `/v1/categories/${id}`, {
      name,
      order_position,
      description: description.toString('markdown'),
      category_father,
    });
    if (typeof image_data === 'object' && image_data instanceof File) {
      const imageUpload = yield getCategoryImageUpload({ id, image_data });
    }
    yield put(Creators.getCategoryUpdateSuccess());
    yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  } catch (err) {
    yield put(Creators.getCategoryUpdateFailure('Erro ao buscar na API'));
  }
}

function* getCategoryDelete({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.delete, `/v1/categories/${id}`);
    yield put(Creators.getCategoryDeleteSuccess());
    // Remove a categoria deletada da lista
    const { categoryList, categoryListTotal } = yield select(
      state => state.category,
    );

    yield put(
      Creators.getCategoryListSuccess({
        data: categoryList.filter(doc => doc.id !== id),
        total: categoryListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getCategoryDeleteFailure('Erro ao buscar na API'));
  }
}

function* getCategoryList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/categories', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getCategoryListSuccess(response.data));
  } catch (err) {
    yield put(Creators.getCategoryListFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* productListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getCategory),
    takeLatest(Types.GET_INSERT_REQUEST, getCategoryInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getCategoryUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getCategoryDelete),
    takeLatest(Types.GET_LIST_REQUEST, getCategoryList),
  ]);
}
