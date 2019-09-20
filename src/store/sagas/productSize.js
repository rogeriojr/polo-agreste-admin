import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/productSize';
import { callApi } from 'store/sagas/auth';

function* getProductSize({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `/v1/admin/products/sizes/${id}`);
    yield put(Creators.getProductSizeSuccess(response.data));
  } catch (err) {
    yield put(Creators.getProductSizeFailure('Erro ao buscar na API'));
  }
}

function* getProductSizeInsert({ payload }) {
  try {
    const { productSize_father, description, name, order_position } = payload;
    const response = yield call(api.post, '/v1/admin/products/sizes', {
      name,
      order_position,
      description: description.toString('markdown'),
      productSize_father,
    });
    yield put(Creators.getProductSizeInsertSuccess());
  } catch (err) {
    yield put(Creators.getProductSizeInsertFailure('Erro ao buscar na API'));
  }
}

function* getProductSizeUpdate({ payload }) {
  try {
    const { id, productSize_father, description, name, order_position } = payload;
    const response = yield call(api.put, `/v1/admin/products/sizes/${id}`, {
      name,
      order_position,
      description: description.toString('markdown'),
      productSize_father,
    });
    yield put(Creators.getProductSizeUpdateSuccess());
  } catch (err) {
    yield put(Creators.getProductSizeUpdateFailure('Erro ao buscar na API'));
  }
}

function* getProductSizeDelete({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.delete, `/v1/admin/products/sizes/${id}`);
    yield put(Creators.getProductSizeDeleteSuccess());
    // Remove a categoria deletada da lista
    const { productSizeList, productSizeListTotal } = yield select(
      state => state.productSize,
    );

    yield put(
      Creators.getProductSizeListSuccess({
        data: productSizeList.filter(doc => doc.id !== id),
        total: productSizeListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getProductSizeDeleteFailure('Erro ao buscar na API'));
  }
}

function* getProductSizeList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/products/sizes', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getProductSizeListSuccess(response.data));
  } catch (err) {
    yield put(Creators.getProductSizeListFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* productListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getProductSize),
    takeLatest(Types.GET_INSERT_REQUEST, getProductSizeInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getProductSizeUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getProductSizeDelete),
    takeLatest(Types.GET_LIST_REQUEST, getProductSizeList),
  ]);
}
