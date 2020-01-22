import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/shopping';
import { callApi } from 'store/sagas/auth';

import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';

function* getShopping({ payload }) {
  try {
    const { id } = payload;
    const request = call(api.get, `/v1/admin/shopping/config`);
    const response = yield call(callApi, request);
    yield put(Creators.getShoppingSuccess(response.data));
  } catch (err) {
    yield put(Creators.getShoppingFailure('Erro ao buscar na API'));
  }
}

function* getShoppingImageUpload(payload) {
  try {
    const { id, image_data } = payload;
    const data = new FormData();
    data.append('image', image_data);
    const response = yield call(
      api.post,
      `/v1/admin/shopping/config/images`,
      data,
    );
    return true;
  } catch (err) {
    return false;
  }
}

function* getShoppingInsert({ payload }) {
  try {
    const {
      name,
      email,
      description,
      cnpj,
      social_name,
      state_register,
      cell_phone,
      cnae,
      website,
      status,
      address,
      manager,
      bank,
      image_data,
    } = payload;
    const response = yield call(api.post, '/v1/admin/shoppings', {
      name,
      email,
      description: description.toString('markdown'),
      cnpj,
      social_name,
      state_register,
      cell_phone,
      cnae,
      website,
      status,
      address,
      manager,
      bank,
    });
    const { id } = response.data.data;
    if (typeof image_data === 'object' && image_data instanceof File) {
      const imageUpload = yield getShoppingImageUpload({ id, image_data });
    }
    yield put(Creators.getShoppingInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/shoppings/update/${id}`));
  } catch (err) {
    yield put(Creators.getShoppingInsertFailure('Erro ao buscar na API'));
  }
}

function* getShoppingUpdate({ payload }) {
  try {
    const {
      id,
      name,
      email,
      description,
      cnpj,
      social_name,
      state_register,
      cell_phone,
      cnae,
      website,
      status,
      address,
      shopping_global,
      image_data,
    } = payload;
    const response = yield call(api.put, `/v1/admin/shopping/config`, {
      name,
      email,
      description: description.toString('markdown'),
      cnpj,
      social_name,
      state_register,
      cell_phone,
      cnae,
      website,
      status,
      address,
      shopping_global,
    });
    if (typeof image_data === 'object' && image_data instanceof File) {
      const imageUpload = yield getShoppingImageUpload({ id, image_data });
    }
    yield put(Creators.getShoppingUpdateSuccess());
    yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  } catch (err) {
    yield put(Creators.getShoppingUpdateFailure('Erro ao buscar na API'));
  }
}

function* getShoppingDelete({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.delete, `/v1/admin/shoppings/${id}`);
    yield put(Creators.getShoppingDeleteSuccess());
    // Remove a categoria deletada da lista
    const { shoppingList, shoppingListTotal } = yield select(
      state => state.shopping,
    );

    yield put(
      Creators.getShoppingListSuccess({
        data: shoppingList.filter(doc => doc.id !== id),
        total: shoppingListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getShoppingDeleteFailure('Erro ao buscar na API'));
  }
}

function* getShoppingList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/shoppings', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getShoppingListSuccess(response.data));
  } catch (err) {
    yield put(Creators.getShoppingListFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* shoppingListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getShopping),
    takeLatest(Types.GET_INSERT_REQUEST, getShoppingInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getShoppingUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getShoppingDelete),
    takeLatest(Types.GET_LIST_REQUEST, getShoppingList),
  ]);
}
