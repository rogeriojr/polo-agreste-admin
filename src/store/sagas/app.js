import { put, takeLatest, all, select } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { scrollOpenViews, scrollOpenViewAndMenu } from 'utils/menuHelper';
import { Types as AppTypes, Creators as AppCreators } from 'store/ducks/app';
import { getJwtIdentity } from 'utils/jwt';
import { Menu } from 'containers/App/menu';
import { Menu as ShopMenu } from 'containers/App/shopMenu';

function* navigateToUrl(action) {
  const { foundMenuItem, foundOpenViewItem, openViews } = action;
  if (foundMenuItem.url !== window.location.pathname) {
    yield put(push(foundMenuItem.url));
  }
  yield put({
    type: AppTypes.SELECTED_MENU_ITEM,
    foundMenuItem,
    foundOpenViewItem,
  });
  scrollOpenViewAndMenu(openViews);
}

function* closeView(action) {
  const { foundMenuItem, foundOpenViewItem, idsToBeRemoved } = action;
  yield put(push(foundMenuItem.url));
  yield put({
    type: AppTypes.SELECTED_MENU_ITEM,
    foundMenuItem,
    foundOpenViewItem,
  });
  yield put({ type: AppTypes.CLOSED_VIEW, idsToBeRemoved });
}

function* openView(action) {
  const { menuItem, icon, openViews } = action;
  const isViewOpened = openViews.find(item => item.id === menuItem.id);
  if (menuItem.url !== window.location.pathname) {
    yield put(push(menuItem.url));
  }
  if (!isViewOpened) {
    yield put({ type: AppTypes.OPENED_VIEW, menuItem, icon });
  }
  yield put({
    type: AppTypes.SELECTED_MENU_ITEM,
    foundMenuItem: menuItem,
    foundOpenViewItem: menuItem,
  });
  if (!isViewOpened) {
    openViews.push(menuItem);
  }
  scrollOpenViews(openViews);
}

function* openDynamicView(action) {
  const { dynamicItem, parentItem, openViews } = action;

  if (dynamicItem.url !== window.location.pathname) {
    yield put(push(dynamicItem.url));
  }
  yield put({
    type: AppTypes.OPENED_DYNAMIC_VIEW,
    dynamicItem,
    parentItem,
  });
  yield put({
    type: AppTypes.SELECTED_MENU_ITEM,
    foundMenuItem: dynamicItem,
    foundOpenViewItem: dynamicItem,
  });

  openViews.push(dynamicItem);
  scrollOpenViews(openViews);
}

const getAuth = state => state.auth;

function* getMenu() {
  const auth = yield select(getAuth);
  const { access_token } = auth.data;
  const jwtIdentity = getJwtIdentity(access_token);
  if (jwtIdentity.user_id === 1 || jwtIdentity.user_id === 2) {
    yield put(
      AppCreators.getMenuSuccess({
        menu: Menu,
        jwtIdentity,
      }),
    );
  } else {
    yield put(
      AppCreators.getMenuSuccess({
        menu: ShopMenu,
        jwtIdentity,
      }),
    );
  }
}

// All sagas to be loaded
export default function* AppSagas() {
  yield all([
    takeLatest(AppTypes.SELECT_MENU_ITEM, navigateToUrl),
    takeLatest(AppTypes.OPEN_VIEW, openView),
    takeLatest(AppTypes.OPEN_DYNAMIC_VIEW, openDynamicView),
    takeLatest(AppTypes.CLOSE_VIEW, closeView),
    takeLatest(AppTypes.GET_MENU_REQUEST, getMenu),
  ]);
}
