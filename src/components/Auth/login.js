import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { isMobile } from 'utils/menuHelper';
import Logo from 'images/oferta_play_logo.png';

import { useDispatch, useSelector } from 'react-redux';

import LoginForm from 'components/form/Login';
import { Creators } from 'store/ducks/auth';
import styles from './styles';

const Login = ({ classes }) => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.auth);

  const onSubmit = ({ email, password }) => {
    dispatch(Creators.getAuthRequest({ email, password }));
  };

  return (
    <div
      className={classNames(
        classes.boxContainer,
        isMobile() ? classes.mobileContainer : {},
      )}
    >
      <div className={classes.boxWrapper}>
        <Paper className={classes.paper} elevation={3} square>
          <div className={classes.logoContainer}>
            <img
              style={{ maxWidth: '100%', height: 60 }}
              src={Logo}
              alt="Oferta Play"
            />
          </div>
          {error ? (
            <Typography paragraph className={classes.errorMessage}>
              * {error}
            </Typography>
          ) : null}
          <LoginForm
            onFormSubmit={onSubmit}
            classes={classes}
            isLoading={loading}
          />
        </Paper>
      </div>
    </div>
  );
};

Login.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withStyles(() => styles(), {
  withTheme: true,
})(Login);
