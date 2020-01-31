import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/coupon';
import { callApi } from 'store/sagas/auth';
import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';

function* getCoupon({ payload }) {
  try {
    const { id } = payload;
    const request = call(api.get, `/v1/admin/promotions/coupons/${id}`);
    const response = yield call(callApi, request);
    yield put(Creators.getCouponSuccess(response.data));
  } catch (err) {
    yield put(Creators.getCouponFailure('Erro ao buscar na API'));
  }
}

function* getCouponInsert({ payload }) {
  try {
    const {
      name,
      code,
      date_start,
      date_end,
      type_discount,
      price_discount,
      price_min,
      price_max,
      quantity,
      quantity_client,
      status,
    } = payload;
    const request = call(api.post, '/v1/admin/promotions/coupons', {
      name,
      code,
      date_start,
      date_end,
      type_discount,
      price_discount,
      price_min,
      price_max,
      quantity,
      quantity_client,
      status,
    });
    const response = yield call(callApi, request);
    const { id } = response.data.data;
    yield put(Creators.getCouponInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/promotion/coupons/update/${id}`));
  } catch (err) {
    yield put(Creators.getCouponInsertFailure('Erro ao buscar na API'));
  }
}

function* getCouponUpdate({ payload }) {
  try {
    const {
      id,
      name,
      code,
      date_start,
      date_end,
      type_discount,
      price_discount,
      price_min,
      price_max,
      quantity,
      quantity_client,
      status,
    } = payload;
    const request = call(api.put, `/v1/admin/promotions/coupons/${id}`, {
      name,
      code,
      date_start,
      date_end,
      type_discount,
      price_discount,
      price_min,
      price_max,
      quantity,
      quantity_client,
      status,
    });
    const response = yield call(callApi, request);
    yield put(Creators.getCouponUpdateSuccess());
    yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  } catch (err) {
    yield put(Creators.getCouponUpdateFailure('Erro ao buscar na API'));
  }
}

function* getCouponDelete({ payload }) {
  try {
    const { id } = payload;
    const request = yield call(
      api.delete,
      `/v1/admin/promotions/coupons/${id}`,
    );
    const response = yield call(callApi, request);
    yield put(Creators.getCouponDeleteSuccess());
    // Remove a categoria deletada da lista
    const { couponList, couponListTotal } = yield select(state => state.coupon);

    yield put(
      Creators.getCouponListSuccess({
        data: couponList.filter(doc => doc.id !== id),
        total: couponListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getCouponDeleteFailure('Erro ao buscar na API'));
  }
}

function* getCouponList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/promotions/coupons', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getCouponListSuccess(response.data));
  } catch (err) {
    if (err.status === 404) {
      yield put(
        Creators.getCouponListSuccess({
          total: 0,
          data: [],
        }),
      );
    } else {
      yield put(Creators.getCouponListFailure('Erro ao buscar na API'));
    }
    yield put(Notifications.error({ title: err.data.msg }));
  }
}

// Individual exports for testing
export default function* productListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getCoupon),
    takeLatest(Types.GET_INSERT_REQUEST, getCouponInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getCouponUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getCouponDelete),
    takeLatest(Types.GET_LIST_REQUEST, getCouponList),
  ]);
}
