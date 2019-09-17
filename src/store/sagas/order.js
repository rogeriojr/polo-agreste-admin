import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';
import { Types, Creators } from 'store/ducks/order';
import { callApi } from 'store/sagas/auth';

import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';

function* getOrder({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `/v1/admin/orders/${id}`);
    yield put(Creators.getOrderSuccess(response.data));
  } catch (err) {
    yield put(Creators.getOrderFailure('Erro ao buscar na API'));
  }
}

function* getOrderInsert({ payload }) {
  try {
    const { category_father, description, name, order_position } = payload;
    const response = yield call(api.post, '/v1/admin/orders', {
      name,
      order_position,
      description: description.toString('markdown'),
      category_father,
    });
    yield put(Creators.getOrderInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/order/update/${response.data.data.id}`));
  } catch (err) {
    yield put(Creators.getOrderInsertFailure('Erro ao buscar na API'));
  }
}

function* getOrderUpdate({ payload }) {
  // try {
  //   const { id, category_father, description, name, order_position } = payload;
  //   const response = yield call(api.put, `/v1/admin/orders/${id}`, {
  //     name,
  //     order_position,
  //     description: description.toString('markdown'),
  //     category_father,
  //   });
  //   yield put(Creators.getOrderUpdateSuccess());
  //   yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  // } catch (err) {
  //   yield put(Creators.getOrderUpdateFailure('Erro ao buscar na API'));
  // }
}

function* getOrderDelete({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.delete, `/v1/admin/orders/${id}`);
    yield put(Creators.getOrderDeleteSuccess());
    // Remove a categoria deletada da lista
    const { categoryList, categoryListTotal } = yield select(
      state => state.category,
    );

    yield put(
      Creators.getOrderListSuccess({
        data: categoryList.filter(doc => doc.id !== id),
        total: categoryListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getOrderDeleteFailure('Erro ao buscar na API'));
  }
}

function* getOrderList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/orders', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    if (response.status !== 200) throw new Error(response);
    yield put(Creators.getOrderListSuccess(response.data));
  } catch (err) {
    yield put(Creators.getOrderListFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* orderListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getOrder),
    takeLatest(Types.GET_INSERT_REQUEST, getOrderInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getOrderUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getOrderDelete),
    takeLatest(Types.GET_LIST_REQUEST, getOrderList),
  ]);
}
