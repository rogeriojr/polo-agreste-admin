import { all, fork } from 'redux-saga/effects';
import appSaga from './app';
import authSaga from './auth';
import productSaga from './product';
import categorySaga from './category';
import storeSaga from './stores';
import citySaga from './city';
import userSaga from './user';
import groupSaga from './group';
import orderSaga from './order';
import pageSaga from './page';
import profileAccessSaga from './profileAccess';
import productColorSaga from './productColor';
import productSizeSaga from './productSize';
import bankSaga from './bank';

export default function* rootSaga() {
  yield all([
    fork(appSaga),
    fork(authSaga),
    fork(productSaga),
    fork(categorySaga),
    fork(storeSaga),
    fork(citySaga),
    fork(userSaga),
    fork(groupSaga),
    fork(orderSaga),
    fork(pageSaga),
    fork(profileAccessSaga),
    fork(productColorSaga),
    fork(productSizeSaga),
    fork(bankSaga),
  ]);
}
