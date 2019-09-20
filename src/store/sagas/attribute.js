import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/attribute';
import { callApi } from 'store/sagas/auth';

function* getAttribute({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `/v1/admin/attributes/${id}`);
    yield put(Creators.getAttributeSuccess(response.data));
  } catch (err) {
    yield put(Creators.getAttributeFailure('Erro ao buscar na API'));
  }
}

function* getAttributeInsert({ payload }) {
  try {
    const { attribute_father, description, name, order_position } = payload;
    const response = yield call(api.post, '/v1/admin/attributes', {
      name,
      order_position,
      description: description.toString('markdown'),
      attribute_father,
    });
    yield put(Creators.getAttributeInsertSuccess());
  } catch (err) {
    yield put(Creators.getAttributeInsertFailure('Erro ao buscar na API'));
  }
}

function* getAttributeUpdate({ payload }) {
  try {
    const { id, attribute_father, description, name, order_position } = payload;
    const response = yield call(api.put, `/v1/admin/attributes/${id}`, {
      name,
      order_position,
      description: description.toString('markdown'),
      attribute_father,
    });
    yield put(Creators.getAttributeUpdateSuccess());
  } catch (err) {
    yield put(Creators.getAttributeUpdateFailure('Erro ao buscar na API'));
  }
}

function* getAttributeDelete({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.delete, `/v1/admin/attributes/${id}`);
    yield put(Creators.getAttributeDeleteSuccess());
    // Remove a categoria deletada da lista
    const { attributeList, attributeListTotal } = yield select(
      state => state.attribute,
    );

    yield put(
      Creators.getAttributeListSuccess({
        data: attributeList.filter(doc => doc.id !== id),
        total: attributeListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getAttributeDeleteFailure('Erro ao buscar na API'));
  }
}

function* getAttributeList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/attributes', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getAttributeListSuccess(response.data));
  } catch (err) {
    yield put(Creators.getAttributeListFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* productListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getAttribute),
    takeLatest(Types.GET_INSERT_REQUEST, getAttributeInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getAttributeUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getAttributeDelete),
    takeLatest(Types.GET_LIST_REQUEST, getAttributeList),
  ]);
}
