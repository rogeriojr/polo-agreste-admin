import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

import LensIcon from '@material-ui/icons/Lens';

import layoutStyles from 'containers/Layout/styles';

const LeftSideBarMenuItem = ({
  classes,
  children,
  handleOnClick,
  icon,
  item,
  nestedClass,
  sidebarIsOpen,
  selectedMenuItem,
  selectedMenuItemParentId,
}) => (
  <MenuItem
    button
    className={classNames(
      nestedClass,

      item.id === selectedMenuItem.id || item.id === selectedMenuItemParentId
        ? classes.selectedMenuItem
        : null,
    )}
    selected={
      item.id === selectedMenuItem.id || item.id === selectedMenuItemParentId
    }
    onClick={() => handleOnClick && handleOnClick(item)}
  >
    {icon ? (
      <ListItemIcon
        className={classNames(
          item.id === selectedMenuItem.id ||
            item.id === selectedMenuItemParentId
            ? classes.selectedItemIcon
            : null,
          classes.MenuItemIcon,
        )}
      >
        {icon}
      </ListItemIcon>
    ) : null}
    {item.id === selectedMenuItem.id && !icon ? (
      <ListItemIcon
        className={classNames(
          classes.selectedItemIcon,
          classes.selectedSubMenuIcon,
        )}
      >
        <LensIcon className={classNames(classes.selectedMenuItemIcon)} />
      </ListItemIcon>
    ) : null}
    <ListItemText
      inset
      disableTypography
      className={classNames(
        sidebarIsOpen ? classes.noPadding : null,
        item.id === selectedMenuItem.id || item.id === selectedMenuItemParentId
          ? classes.selectedItemText
          : null,
        classes.listItemText,
        !icon ? classes.MenuItemText : null,
        'truncate-list-item-text',
      )}
      primary={item.text}
    />
    {children}
  </MenuItem>
);

LeftSideBarMenuItem.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleOnClick: PropTypes.func,
  icon: PropTypes.oneOfType([PropTypes.object]),
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
  nestedClass: PropTypes.string,
  selectedMenuItem: PropTypes.oneOfType([PropTypes.object]).isRequired,
  selectedMenuItemParentId: PropTypes.string,
  sidebarIsOpen: PropTypes.bool.isRequired,
};

LeftSideBarMenuItem.defaultProps = {
  children: null,
  handleOnClick: null,
  nestedClass: '',
  icon: null,
  selectedMenuItemParentId: '',
};

export default withStyles(theme => layoutStyles(theme), {
  withTheme: true,
})(LeftSideBarMenuItem);
