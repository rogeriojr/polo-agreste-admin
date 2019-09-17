import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/city';
import { callApi } from 'store/sagas/auth';

function* getCity({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `/v1/admin/cities/${id}`);
    yield put(Creators.getCitySuccess(response.data));
  } catch (err) {
    yield put(Creators.getCityFailure('Erro ao buscar na API'));
  }
}

function* getCityInsert({ payload }) {
  try {
    const { city_father, description, name, order_position } = payload;
    const response = yield call(api.post, '/v1/admin/cities', {
      name,
      order_position,
      description: description.toString('markdown'),
      city_father,
    });
    yield put(Creators.getCityInsertSuccess());
  } catch (err) {
    yield put(Creators.getCityInsertFailure('Erro ao buscar na API'));
  }
}

function* getCityUpdate({ payload }) {
  try {
    const { id, city_father, description, name, order_position } = payload;
    const response = yield call(api.put, `/v1/admin/cities/${id}`, {
      name,
      order_position,
      description: description.toString('markdown'),
      city_father,
    });
    yield put(Creators.getCityUpdateSuccess());
  } catch (err) {
    yield put(Creators.getCityUpdateFailure('Erro ao buscar na API'));
  }
}

function* getCityDelete({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.delete, `/v1/admin/cities/${id}`);
    yield put(Creators.getCityDeleteSuccess());
    // Remove a categoria deletada da lista
    const { cityList, cityListTotal } = yield select(state => state.city);

    yield put(
      Creators.getCityListSuccess({
        data: cityList.filter(doc => doc.id !== id),
        total: cityListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getCityDeleteFailure('Erro ao buscar na API'));
  }
}

function* getCityList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/cities', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getCityListSuccess(response.data));
  } catch (err) {
    yield put(Creators.getCityListFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* productListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getCity),
    takeLatest(Types.GET_INSERT_REQUEST, getCityInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getCityUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getCityDelete),
    takeLatest(Types.GET_LIST_REQUEST, getCityList),
  ]);
}
