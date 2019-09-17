import { fromJS } from 'immutable';
import { findMenuItem, getNextIndex } from 'utils/menuHelper';
import { Menu } from 'containers/App/menu';

export const Types = {
  OPEN_VIEW: 'app/OPEN_VIEW',
  OPEN_DYNAMIC_VIEW: 'app/OPEN_DYNAMIC_VIEW',
  OPENED_VIEW: 'app/OPENED_VIEW',
  OPENED_DYNAMIC_VIEW: 'app/OPENED_DYNAMIC_VIEW',
  CLOSE_VIEW: 'app/CLOSE_VIEW',
  CLOSED_VIEW: 'app/CLOSED_VIEW',
  SELECT_MENU_ITEM: 'app/SELECT_MENU_ITEM',
  SELECTED_MENU_ITEM: 'app/SELECTED_MENU_ITEM',

  OPEN_SETTING_DRAWER: 'app/OPEN_SETTING_DRAWER',
  CLOSE_SETTING_DRAWER: 'app/CLOSE_SETTING_DRAWER',
  CHANGE_THEME: 'app/CHANGE_THEME',

  SHOW_HIDE_OPEN_VIEWS: 'app/SHOW_HIDE_OPEN_VIEWS',
  SHOW_HIDE_HEADER_TABS: 'app/SHOW_HIDE_HEADER_TABS',

  SHOW_SEARCH: 'app/SHOW_SEARCH',
};

const selectedMenuItem = Menu[0];
const openedViews = [];
openedViews.push(selectedMenuItem);

// The initial state of the App
const initialState = fromJS({
  menu: Menu,
  selectedMenuItem,
  openViews: openedViews,
  selectedOpenedMenuItem: selectedMenuItem,
  currentTheme: '44Express', // atom, aurelia, quiet, sky, default
  showOpenViews: false,
  showHeaderTabs: true,
  showSearch: false,
  openSettingDrawer: false,
});

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case Types.OPENED_VIEW: {
      const { menuItem, icon } = action;
      menuItem.icon = icon;

      return state.updateIn(['openViews'], arr => arr.push(menuItem));
    }
    case Types.OPENED_DYNAMIC_VIEW: {
      const { dynamicItem, parentItem } = action;

      return state
        .updateIn(['menu'], arr => {
          const menu = arr.toJS();
          dynamicItem.index = getNextIndex(menu);
          const { foundMenuItem } = findMenuItem(menu, 'id', parentItem.id);
          foundMenuItem.children.push(dynamicItem);

          return fromJS(menu);
        })
        .updateIn(['openViews'], arr => {
          const openViews = arr.toJS();
          const openView = Object.assign({}, dynamicItem);
          openView.icon = parentItem.icon;
          openViews.push(openView);

          return fromJS(openViews);
        });
    }
    case Types.CLOSED_VIEW: {
      const { idsToBeRemoved } = action;

      return state.updateIn(['openViews'], arr => {
        const openViews = arr.toJS();

        idsToBeRemoved.forEach(id => {
          const itemToBeRemoved = openViews.find(item => item.id === id);
          const index = openViews.indexOf(itemToBeRemoved);
          openViews.splice(index, 1);
        });

        return fromJS(openViews);
      });
    }
    case Types.SELECTED_MENU_ITEM: {
      return state
        .set('selectedMenuItem', action.foundMenuItem)
        .set('selectedOpenedMenuItem', action.foundOpenViewItem);
    }
    case Types.OPEN_SETTING_DRAWER:
      return state.set('openSettingDrawer', true);
    case Types.CLOSE_SETTING_DRAWER:
      return state.set('openSettingDrawer', false);
    case Types.CHANGE_THEME: {
      return state.set('currentTheme', action.theme);
    }
    case Types.SHOW_HIDE_OPEN_VIEWS:
      return state.set('showOpenViews', action.showHide);
    case Types.SHOW_HIDE_HEADER_TABS:
      return state.set('showHeaderTabs', action.showHide);
    case Types.SHOW_SEARCH: {
      const { value } = action;
      return state.set('showSearch', value);
    }
    default:
      return state;
  }
}

export const Creators = {
  openView: (menuItem, icon, openViews) => ({
    type: Types.OPEN_VIEW,
    menuItem,
    icon,
    openViews,
  }),

  openDynamicView: (dynamicItem, parentItem, openViews) => ({
    type: Types.OPEN_DYNAMIC_VIEW,
    dynamicItem,
    parentItem,
    openViews,
  }),

  selectMenuItem: (foundMenuItem, foundOpenViewItem, openViews) => ({
    type: Types.SELECT_MENU_ITEM,
    foundMenuItem,
    foundOpenViewItem,
    openViews,
  }),

  closeView: (foundMenuItem, foundOpenViewItem, idsToBeRemoved) => ({
    type: Types.CLOSE_VIEW,
    foundMenuItem,
    foundOpenViewItem,
    idsToBeRemoved,
  }),

  openSettingsDrawer: () => ({
    type: Types.OPEN_SETTING_DRAWER,
  }),

  closeSettingsDrawer: () => ({
    type: Types.CLOSE_SETTING_DRAWER,
  }),

  changeTheme: theme => ({
    type: Types.CHANGE_THEME,
    theme,
  }),

  showHideOpenViews: showHide => ({
    type: Types.SHOW_HIDE_OPEN_VIEWS,
    showHide,
  }),

  showHideHeaderTabs: showHide => ({
    type: Types.SHOW_HIDE_HEADER_TABS,
    showHide,
  }),

  showHideSearch: value => ({
    type: Types.SHOW_SEARCH,
    value,
  }),
};
