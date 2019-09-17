import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import layoutStyles from 'containers/Layout/styles';

import Logo from 'images/logo.png';

const LeftSideDrawer = ({ classes, children }) => (
  <div className={classes.drawerInner}>
    <div className={classes.drawerHeader}>
      <div className={classes.sidebarTitle}>
        <img src={Logo} className="logo" alt="" />
      </div>
    </div>
    {children}
  </div>
);

LeftSideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(theme => layoutStyles(theme), {
  withTheme: true,
})(LeftSideDrawer);
