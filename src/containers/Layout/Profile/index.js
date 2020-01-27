import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import { Creators as AuthCreators } from 'store/ducks/auth';
import styles from './styles';

const Profile = ({ classes, drawerIsOpen }) => {
  const dispatch = useDispatch()

  const [state, setState] = React.useState({
    anchorEl: null,
  });


  const handleMenu = event => {
    setState(oldState => ({ ...oldState, anchorEl: event.currentTarget }));
  };

  const handleClose = () => {
    setState(oldState => ({ ...oldState, anchorEl: null }));
  };

  const signOut = () => {
    setState(oldState => ({ ...oldState, anchorEl: null }));
    dispatch(AuthCreators.getAuthUnauthUser());
  };

  const open = Boolean(state.anchorEl);

  return (
    <div>
      <Tooltip title="John Doe">
        <IconButton
          aria-owns={drawerIsOpen ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={handleMenu}
        >
          <Avatar className={classes.avatar}>JD</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={state.anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <Divider />
        <MenuItem onClick={signOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerIsOpen: PropTypes.bool.isRequired,
};

export default withStyles(theme => styles(theme), { withTheme: true })(Profile);
