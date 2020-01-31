import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/group';
import { callApi } from 'store/sagas/auth';

import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';

function* getGroup({ payload }) {
  try {
    const { id } = payload;
    const request = yield call(api.get, `/v1/admin/groups/${id}`);
    const response = yield call(callApi, request);
    yield put(Creators.getGroupSuccess(response.data));
  } catch (err) {
    yield put(Creators.getGroupFailure('Erro ao buscar na API'));
  }
}

function* getGroupInsert({ payload }) {
  try {
    const { group_father, description, name, order_position } = payload;
    const request = yield call(api.post, '/v1/admin/groups', {
      name,
      order_position,
      description: description.toString('markdown'),
      group_father,
    });
    const response = yield call(callApi, request);
    yield put(Creators.getGroupInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/group/update/${response.data.data.id}`));
  } catch (err) {
    yield put(Creators.getGroupInsertFailure('Erro ao buscar na API'));
  }
}

function* getGroupUpdate({ payload }) {
  try {
    const { id, group_father, description, name, order_position } = payload;
    const request = yield call(api.put, `/v1/admin/groups/${id}`, {
      name,
      order_position,
      description: description.toString('markdown'),
      group_father,
    });
    const response = yield call(callApi, request);
    yield put(Creators.getGroupUpdateSuccess());
    yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  } catch (err) {
    yield put(Creators.getGroupUpdateFailure('Erro ao buscar na API'));
  }
}

function* getGroupDelete({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.delete, `/v1/admin/groups/${id}`);
    yield put(Creators.getGroupDeleteSuccess());
    // Remove a categoria deletada da lista
    const { groupList, groupListTotal } = yield select(state => state.group);

    yield put(
      Creators.getGroupListSuccess({
        data: groupList.filter(doc => doc.id !== id),
        total: groupListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getGroupDeleteFailure('Erro ao buscar na API'));
  }
}

function* getGroupList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/groups', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getGroupListSuccess(response.data));
  } catch (err) {
    if (err.status === 404) {
      yield put(
        Creators.getGroupListSuccess({
          total: 0,
          data: [],
        }),
      );
    } else {
      yield put(Creators.getGroupListFailure('Erro ao buscar na API'));
    }
    yield put(Notifications.error({ title: err.data.msg }));
  }
}

// Individual exports for testing
export default function* productListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getGroup),
    takeLatest(Types.GET_INSERT_REQUEST, getGroupInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getGroupUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getGroupDelete),
    takeLatest(Types.GET_LIST_REQUEST, getGroupList),
  ]);
}
