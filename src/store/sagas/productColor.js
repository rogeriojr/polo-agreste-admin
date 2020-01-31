import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/productColor';
import { callApi } from 'store/sagas/auth';
import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';

function* getProductColor({ payload }) {
  try {
    const { id } = payload;
    const request = call(api.get, `/v1/admin/products/colors/${id}`);
    const response = yield call(callApi, request);
    yield put(Creators.getProductColorSuccess(response.data));
  } catch (err) {
    yield put(Creators.getProductColorFailure('Erro ao buscar na API'));
  }
}

function* getProductColorInsert({ payload }) {
  try {
    const { order_position, hexa, code, name, status } = payload;
    const request = call(api.post, '/v1/admin/products/colors', {
      order_position,
      hexa,
      code,
      name,
      status,
    });
    const response = yield call(callApi, request);
    const { id } = response.data.data;
    yield put(Creators.getProductColorInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/catalog/colors/update/${id}`));
  } catch (err) {
    yield put(Creators.getProductColorInsertFailure('Erro ao buscar na API'));
  }
}

function* getProductColorUpdate({ payload }) {
  try {
    const { id, order_position, hexa, code, name, status } = payload;
    const request = call(api.put, `/v1/admin/products/colors/${id}`, {
      order_position,
      hexa,
      code,
      name,
      status,
    });
    const response = yield call(callApi, request);
    yield put(Creators.getProductColorUpdateSuccess());
    yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  } catch (err) {
    yield put(Creators.getProductColorUpdateFailure('Erro ao buscar na API'));
  }
}

function* getProductColorDelete({ payload }) {
  try {
    const { id } = payload;
    const request = call(api.delete, `/v1/admin/products/colors/${id}`);
    const response = yield call(callApi, request);
    yield put(Creators.getProductColorDeleteSuccess());
    // Remove a categoria deletada da lista
    const { productColorList, productColorListTotal } = yield select(
      state => state.productColor,
    );

    yield put(
      Creators.getProductColorListSuccess({
        data: productColorList.filter(doc => doc.id !== id),
        total: productColorListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getProductColorDeleteFailure('Erro ao buscar na API'));
  }
}

function* getProductColorList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/products/colors', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getProductColorListSuccess(response.data));
  } catch (err) {
    if (err.status === 404) {
      yield put(
        Creators.getProductColorListSuccess({
          total: 0,
          data: [],
        }),
      );
    } else {
      yield put(Creators.getProductColorListFailure('Erro ao buscar na API'));
    }
    yield put(Notifications.error({ title: err.data.msg }));
  }
}

// Individual exports for testing
export default function* productListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getProductColor),
    takeLatest(Types.GET_INSERT_REQUEST, getProductColorInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getProductColorUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getProductColorDelete),
    takeLatest(Types.GET_LIST_REQUEST, getProductColorList),
  ]);
}
