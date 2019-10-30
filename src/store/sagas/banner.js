import { call, takeLatest, all, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Types, Creators } from 'store/ducks/banner';
import { callApi } from 'store/sagas/auth';

import { push } from 'connected-react-router';
import Notifications from 'react-notification-system-redux';

function* getBanner({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `/v1/admin/banners/${id}`);
    yield put(Creators.getBannerSuccess(response.data));
  } catch (err) {
    yield put(Creators.getBannerFailure('Erro ao buscar na API'));
  }
}

function* getBannerImagesUpload(payload) {
  try {
    const { id, images_data, images_info } = payload;
    let iLocal = 0;
    for (let i = 0; i < images_info.length; i += 1) {
      const image_info = images_info[i];
      if (image_info.type === 'local') {
        const image = images_data[iLocal];
        const data = new FormData();
        data.append('image', image);
        const response = yield call(api.post, `/v1/admin/banners/${id}/images`, data);
        const id_image = response.data.data.id;
        image_info.id = id_image;
        iLocal += 1;
      }
      yield call(api.put, `/v1/admin/banners/${id}/images/${image_info.id}`, {
        order_position: image_info.order_position,
        link: image_info.link,
        route: image_info.route,
        show_mobile: image_info.show_mobile,
        show_tablet: image_info.show_tablet,
        show_desktop: image_info.show_desktop,
      });
    }
    yield put({ type: 'UPLOAD_SUCCESS' });
  } catch (err) {
    yield put({ type: 'UPLOAD_FAILURE' });
  }
}

function* getBannerInsert({ payload }) {
  try {
    const { name, status, images_data, images_info } = payload;
    const response = yield call(api.post, '/v1/admin/banners', {
      name,
      status,
    });
    const { id } = response.data.data;
    yield getBannerImagesUpload({ id, images_data, images_info });
    yield put(Creators.getBannerInsertSuccess());
    yield put(
      Notifications.success({ title: 'Cadastro concluido com sucesso' }),
    );
    yield put(push(`/marketing/banners/update/${id}`));
  } catch (err) {
    yield put(Creators.getBannerInsertFailure('Erro ao buscar na API'));
  }
}

function* getBannerUpdate({ payload }) {
  try {
    const { id, name, status, images_data, images_info } = payload;
    /* const response =  */ yield call(api.put, `/v1/admin/banners/${id}`, {
      name,
      status,
    });
    yield getBannerImagesUpload({ id, images_data, images_info });
    yield put(Creators.getBannerUpdateSuccess());
    yield put(Creators.getBannerRequest({ id }));
    yield put(Notifications.success({ title: 'Edição concluida com sucesso' }));
  } catch (err) {
    yield put(Creators.getBannerUpdateFailure('Erro ao buscar na API'));
  }
}

function* getBannerDelete({ payload }) {
  try {
    const { id } = payload;
    /* const response =  */ yield call(api.delete, `/v1/admin/banners/${id}`);
    yield put(Creators.getBannerDeleteSuccess());
    // Remove a categoria deletada da lista
    const { bannerList, bannerListTotal } = yield select(
      state => state.banner,
    );

    yield put(
      Creators.getBannerListSuccess({
        data: bannerList.filter(doc => doc.id !== id),
        total: bannerListTotal - 1,
      }),
    );
  } catch (err) {
    yield put(Creators.getBannerDeleteFailure('Erro ao buscar na API'));
  }
}

function* getImageBannerDelete({ payload }) {
  try {
    const { id, id_banner } = payload;
    yield call(api.delete, `/v1/admin/banners/${id_banner}/images/${id}`);
    yield put(Creators.getImageBannerDeleteSuccess());
  } catch (err) {
    yield put(Creators.getImageBannerDeleteFailure('Erro ao buscar na API'));
  }
}

function* getBannerList({ payload }) {
  try {
    const { page, perPage, search, orderByColumn, orderByDirection } = payload;
    const request = call(api.get, '/v1/admin/banners', {
      page,
      search,
      per_page: perPage,
      order: orderByColumn,
      order_by: orderByDirection,
    });

    const response = yield call(callApi, request);
    yield put(Creators.getBannerListSuccess(response.data));
  } catch (err) {
    yield put(Creators.getBannerListFailure('Erro ao buscar na API'));
  }
}

// Individual exports for testing
export default function* bannerListSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getBanner),
    takeLatest(Types.GET_INSERT_REQUEST, getBannerInsert),
    takeLatest(Types.GET_UPDATE_REQUEST, getBannerUpdate),
    takeLatest(Types.GET_DELETE_REQUEST, getBannerDelete),
    takeLatest(Types.GET_IMAGE_DELETE_REQUEST, getImageBannerDelete),
    takeLatest(Types.GET_LIST_REQUEST, getBannerList),
  ]);
}
