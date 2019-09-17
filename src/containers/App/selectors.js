import { createSelector } from 'reselect';

const selectState = state => state;
const selectGlobal = state => state.app;
const selectRouter = state => state.router;
const selectAuth = state => state.auth;

// Menu
const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectMenu = () =>
  createSelector(
    selectGlobal,
    state => state.get('menu').toJS(),
  );
const makeSelectSelectedMenuItem = () =>
  createSelector(
    selectGlobal,
    state => state.get('selectedMenuItem'),
  );

const makeSelectOpenViews = () =>
  createSelector(
    selectGlobal,
    state => state.get('openViews').toJS(),
  );
const makeSelectSelectedOpenedMenuItem = () =>
  createSelector(
    selectGlobal,
    state => state.get('selectedOpenedMenuItem'),
  );

// Settings
const makeSelectCurrentTheme = () =>
  createSelector(
    selectGlobal,
    state => state.get('currentTheme'),
  );
const makeSelectOpenSettingDrawer = () =>
  createSelector(
    selectGlobal,
    state => state.get('openSettingDrawer'),
  );
const makeSelectShowOpenView = () =>
  createSelector(
    selectGlobal,
    state => state.get('showOpenViews'),
  );
const makeSelectShowHeaderTabs = () =>
  createSelector(
    selectGlobal,
    state => state.get('showHeaderTabs'),
  );
const makeSelectShowSearch = () =>
  createSelector(
    selectGlobal,
    state => state.get('showSearch'),
  );
const makeSelectIsAuth = () =>
  createSelector(
    selectAuth,
    state => state.isAuth,
  );
const makeSelectNotifications = () =>
  createSelector(
    selectState,
    state => state.notifications,
  );

export {
  makeSelectLocation,
  makeSelectMenu,
  makeSelectSelectedMenuItem,
  makeSelectOpenViews,
  makeSelectSelectedOpenedMenuItem,
  makeSelectCurrentTheme,
  makeSelectOpenSettingDrawer,
  makeSelectShowOpenView,
  makeSelectShowHeaderTabs,
  makeSelectShowSearch,
  makeSelectIsAuth,
  makeSelectNotifications,
};
