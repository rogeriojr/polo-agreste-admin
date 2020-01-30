import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/profileAccess';
import { callApi } from 'store/sagas/auth';

import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';

function* getProfileAccess({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `/v1/admin/users/${id}`); // rota users passada somente para teste
    yield put(Creators.getProfileAccessSuccess(response.data));
  } catch (err) {
    yield put(Creators.getProfileAccessFailure('Erro ao buscar na API'));
  }
}

function* getProfileAccessImageUpload(payload) {
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

function* getProfileAccessInsert({ payload }) {
  try {
    const {
      profileAccess_father,
      description,
      name,
      order_position,
      image_data,
    } = payload;
    const response = yield call(api.post, '/v1/admin/users', {
      name,
      order_position,
      description: description.toString('markdown'),
      profileAccess_father,
    });
    const { id } = response.data.data;
    if (typeof image_data === 'object' && image_data instanceof File) {
      const imageUpload = yield getProfileAccessImageUpload({ id, image_data });
    }
    yield put(Creators.getProfileAccessInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/users/update/${id}`));
  } catch (err) {
    yield put(Creators.getProfileAccessInsertFailure('Erro ao buscar na API'));
  }
}

function* getProfileAccessUpdate({ payload }) {
  try {
    const {
      id,
      profileAccess_father,
      description,
      name,
      order_position,
      image_data,
    } = payload;
    const response = yield call(api.put, `/v1/admin/users/${id}`, {
      name,
      order_position,
      description: description.toString('markdown'),
      profileAccess_father,
    });
    if (typeof image_data === 'object' && image_data instanceof File) {
      const imageUpload = yield getProfileAccessImageUpload({ id, image_data });
    }
    yield put(Creators.getProfileAccessUpdateSuccess());
    yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  } catch (err) {
    yield put(Creators.getProfileAccessUpdateFailure('Erro ao buscar na API'));
  }
}

function* getProfileAccessDelete({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.delete, `/v1/admin/users/${id}`);
    yield put(Creators.getProfileAccessDeleteSuccess());
    // Remove o perfil de acesso deletado da lista
    const { profileAccessList, profileAccessListTotal } = yield select(
      state => state.profileAccess,
    );

    yield put(
      Creators.getProfileAccessListSuccess({
        data: profileAccessList.filter(doc => doc.id !== id),
        total: profileAccessListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getProfileAccessDeleteFailure('Erro ao buscar na API'));
  }
}

function* getProfileAccessList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/users', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getProfileAccessListSuccess(response.data));
  } catch (err) {
    if (err.status === 404) {
      yield put(
        Creators.getProfileAccessListSuccess({
          total: 0,
          data: [],
        }),
      );
    } else {
      yield put(Creators.getProfileAccessListFailure('Erro ao buscar na API'));
    }
    yield put(Notifications.error({ title: err.data.msg }));
  }
}

// Individual exports for testing
export default function* productListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getProfileAccess),
    takeLatest(Types.GET_INSERT_REQUEST, getProfileAccessInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getProfileAccessUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getProfileAccessDelete),
    takeLatest(Types.GET_LIST_REQUEST, getProfileAccessList),
  ]);
}
