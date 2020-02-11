import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import layoutStyles from 'containers/Layout/styles';
import Logo from 'images/logo.png';

const LeftSideDrawer = ({ classes, children }) => (
  <div className={classes.drawerInner}>
    <div style={{ marginLeft: 43, marginRight: 43, marginBottom: 20 }}>
      <img src={Logo} className="logo" alt="" />
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
