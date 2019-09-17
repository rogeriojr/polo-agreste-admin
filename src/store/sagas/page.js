import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/page';
import { callApi } from 'store/sagas/auth';

import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';

function* getPage({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `/v1/pages/${id}`);
    yield put(Creators.getPageSuccess(response.data));
  } catch (err) {
    yield put(Creators.getPageFailure('Erro ao buscar na API'));
  }
}

function* getPageInsert({ payload }) {
  try {
    const { name, description } = payload;
    const response = yield call(api.post, '/v1/pages', {
      name,
      description: description.toString('markdown'),
    });
    yield put(Creators.getPageInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/page/update/${response.data.data.id}`));
  } catch (err) {
    yield put(Creators.getPageInsertFailure('Erro ao buscar na API'));
  }
}

function* getPageUpdate({ payload }) {
  try {
    const { id, name, description } = payload;
    const response = yield call(api.put, `/v1/pages/${id}`, {
      name,
      description: description.toString('markdown'),
    });
    yield put(Creators.getPageUpdateSuccess());
    yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  } catch (err) {
    yield put(Creators.getPageUpdateFailure('Erro ao buscar na API'));
  }
}

function* getPageDelete({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.delete, `/v1/pages/${id}`);
    yield put(Creators.getPageDeleteSuccess());
    // Remove a categoria deletada da lista
    const { pageList, pageListTotal } = yield select(state => state.page);

    yield put(
      Creators.getPageListSuccess({
        data: pageList.filter(doc => doc.id !== id),
        total: pageListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getPageDeleteFailure('Erro ao buscar na API'));
  }
}

function* getPageList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/pages', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getPageListSuccess(response.data));
  } catch (err) {
    yield put(Creators.getPageListFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* productListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getPage),
    takeLatest(Types.GET_INSERT_REQUEST, getPageInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getPageUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getPageDelete),
    takeLatest(Types.GET_LIST_REQUEST, getPageList),
  ]);
}
