import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/product';
import { callApi } from 'store/sagas/auth';

import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';

function* getProduct({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `/v1/admin/products/${id}`);
    yield put(Creators.getProductSuccess(response.data));
  } catch (err) {
    yield put(Creators.getProductFailure('Erro ao buscar na API'));
  }
}

function* getProductImagesUpload(payload) {
  try {
    const { id, images_data, featured } = payload;
    yield all(
      images_data.map(image => {
        const data = new FormData();
        data.append('image', image);
        //data.append('featured', featured);
        return call(api.post, `/v1/admin/products/${id}/images`, data);
      }),
    );
    yield put({ type: 'UPLOAD_SUCCESS' });
  } catch (err) {
    yield put({ type: 'UPLOAD_FAILURE' });
  }
}

function* getProductInsert({ payload }) {
  try {
    const {
      code_integration,
      code_ncm,
      code_ean,
      name,
      description,
      description_tec,
      stock_control,
      stock,
      price,
      price_whole,
      quantity_max,
      quantity_min_whole,
      quantity_max_whole,
      height,
      width,
      length,
      weight,
      status,
      store,
      categories,
      featured,
      images_data,
      variations,
      related,
      genres,
    } = payload;
    const response = yield call(api.post, '/v1/admin/products', {
      code_integration,
      code_ncm,
      code_ean,
      name,
      description: description.toString('markdown'),
      description_tec: description_tec.toString('markdown'),
      stock_control,
      stock,
      price,
      price_whole,
      quantity_max,
      quantity_min_whole,
      quantity_max_whole,
      height,
      width,
      length,
      weight,
      status,
      store,
      categories,
      variations,
      related,
      genres,
    });
    const { id } = response.data.data;
    yield getProductImagesUpload({ id, featured, images_data });
    yield put(Creators.getProductInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/catalog/products/update/${id}`));
  } catch (err) {
    yield put(Creators.getProductInsertFailure('Erro ao buscar na API'));
  }
}

function* getProductUpdate({ payload }) {
  try {
    const {
      id,
      code_integration,
      genres,
      code_ncm,
      code_ean,
      name,
      description,
      description_tec,
      stock_control,
      stock,
      price,
      price_whole,
      quantity_max,
      quantity_min_whole,
      quantity_max_whole,
      height,
      width,
      length,
      weight,
      status,
      store,
      categories,
      featured,
      images_data,
      variations,
      related,
    } = payload;
    const response = yield call(api.put, `/v1/admin/products/${id}`, {
      code_integration,
      genres,
      code_ncm,
      code_ean,
      name,
      description: description.toString('markdown'),
      description_tec: description_tec.toString('markdown'),
      stock_control,
      stock,
      price,
      price_whole,
      quantity_max,
      quantity_min_whole,
      quantity_max_whole,
      height,
      width,
      length,
      weight,
      status,
      store,
      featured,
      categories,
      variations,
      related,
    });
    yield getProductImagesUpload({ id, images_data });
    if (response.status != 200) throw response;
    yield put(Creators.getProductUpdateSuccess(response.data));
    yield put(Creators.getProductRequest({ id }));
    yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  } catch (err) {
    yield put(Notifications.error({ title: err.data.msg }));
    yield put(Creators.getProductUpdateFailure('Erro ao buscar na API'));
  }
}

function* getProductDelete({ payload }) {
  try {
    const { id } = payload;
    /* const response =  */ yield call(api.delete, `/v1/admin/products/${id}`);
    yield put(Creators.getProductDeleteSuccess());
    // Remove a categoria deletada da lista
    const { productList, productListTotal } = yield select(
      state => state.product,
    );

    yield put(
      Creators.getProductListSuccess({
        data: productList.filter(doc => doc.id !== id),
        total: productListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getProductDeleteFailure('Erro ao buscar na API'));
  }
}

function* getImageProductDelete({ payload }) {
  try {
    const { id, id_product } = payload;
    yield call(api.delete, `/v1/admin/products/${id_product}/images/${id}`);
    yield put(Creators.getImageProductDeleteSuccess());
  } catch (err) {
    yield put(Creators.getImageProductDeleteFailure('Erro ao buscar na API'));
  }
}

function* getProductList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/products', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });
    const response = yield call(callApi, request);
    yield put(Creators.getProductListSuccess(response.data));
  } catch (err) {
    if (err.status === 404) {
      yield put(
        Creators.getProductListSuccess({
          total: 0,
          data: [],
        }),
      );
    } else {
      yield put(Creators.getProductListFailure('Erro ao buscar na API'));
    }
    yield put(Notifications.error({ title: err.data.msg }));
  }
}

// Individual exports for testing
export default function* productListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getProduct),
    takeLatest(Types.GET_INSERT_REQUEST, getProductInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getProductUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getProductDelete),
    takeLatest(Types.GET_IMAGE_DELETE_REQUEST, getImageProductDelete),
    takeLatest(Types.GET_LIST_REQUEST, getProductList),
  ]);
}
