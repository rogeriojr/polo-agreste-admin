import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/user';
import { callApi } from 'store/sagas/auth';

import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';

// Teste

function* getUser({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `/v1/admin/users/${id}`);
    yield put(Creators.getUserSuccess(response.data));
  } catch (err) {
    yield put(Creators.getUserFailure('Erro ao buscar na API'));
  }
}

function* getUserImageUpload(payload) {
  try {
    const { id, image_data } = payload;
    const data = new FormData();
    data.append('image', image_data);
    const response = yield call(api.post, `/v1/admin/users/${id}/images`, data);
    return true;
  } catch (err) {
    return false;
  }
}

function* getUserInsert({ payload }) {
  try {
    const {
      email,
      password,
      name,
      cpf,
      genre,
      description,
      cell_phone,
      birth_date,
      group,
      store,
      address,
      image_data,
    } = payload;
    const response = yield call(api.post, '/v1/admin/users', {
      email,
      password,
      name,
      cpf,
      genre,
      cell_phone,
      birth_date,
      group,
      store,
      address,
    });
    const { id } = response.data.data;
    if (typeof image_data === 'object' && image_data instanceof File) {
      const imageUpload = yield getUserImageUpload({ id, image_data });
    }
    yield put(Creators.getUserInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/users/update/${id}`));
  } catch (err) {
    yield put(Creators.getUserInsertFailure('Erro ao buscar na API'));
  }
}

function* getUserUpdate({ payload }) {
  try {
    const {
      id,
      email,
      password,
      name,
      cpf,
      genre,
      description,
      cell_phone,
      birth_date,
      store,
      group,
      address,
      image_data,
    } = payload;
    const response = yield call(api.put, `/v1/admin/users/${id}`, {
      email,
      password,
      name,
      cpf,
      genre,
      cell_phone,
      birth_date,
      store,
      group,
      address,
    });
    if (typeof image_data === 'object' && image_data instanceof File) {
      const imageUpload = yield getUserImageUpload({ id, image_data });
    }
    yield put(Creators.getUserUpdateSuccess());
    yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  } catch (err) {
    yield put(Creators.getUserUpdateFailure('Erro ao buscar na API'));
  }
}

function* getUserDelete({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.delete, `/v1/admin/users/${id}`);
    yield put(Creators.getUserDeleteSuccess());
    // Remove a categoria deletada da lista
    const { userList, userListTotal } = yield select(state => state.user);

    yield put(
      Creators.getUserListSuccess({
        data: userList.filter(doc => doc.id !== id),
        total: userListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getUserDeleteFailure('Erro ao buscar na API'));
  }
}

function* getUserList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection, group_id } = payload;
    const request = call(api.get, '/v1/admin/users', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
      group_id,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getUserListSuccess(response.data));
  } catch (err) {
    yield put(Creators.getUserListFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* productListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getUser),
    takeLatest(Types.GET_INSERT_REQUEST, getUserInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getUserUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getUserDelete),
    takeLatest(Types.GET_LIST_REQUEST, getUserList),
  ]);
}
