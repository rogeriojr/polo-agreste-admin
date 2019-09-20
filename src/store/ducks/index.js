/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';

import appReducer from 'store/ducks/app';
import authReducer from 'store/ducks/auth';
import productReducer from 'store/ducks/product';
import categoryReducer from 'store/ducks/category';
import storeReducer from 'store/ducks/stores';
import cityReducer from 'store/ducks/city';
import userReducer from 'store/ducks/user';
import groupReducer from 'store/ducks/group';
import orderReducer from 'store/ducks/order';
import pageReducer from 'store/ducks/page';
import profileAccessReducer from 'store/ducks/profileAccess';
import attributeReducer from 'store/ducks/attribute';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default history =>
  combineReducers({
    router: connectRouter(history),
    notifications,
    app: appReducer,
    product: productReducer,
    auth: authReducer,
    category: categoryReducer,
    store: storeReducer,
    city: cityReducer,
    user: userReducer,
    group: groupReducer,
    order: orderReducer,
    page: pageReducer,
    profileAccess: profileAccessReducer,
    attribute: attributeReducer,
  });
