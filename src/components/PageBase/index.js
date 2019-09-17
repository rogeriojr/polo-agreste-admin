import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import layoutStyles from 'containers/Layout/styles';
import Transition from 'components/Transition';
import styles from './styles';

const PageBase = ({
  loading,
  classes,
  children,
  minHeight,
  showLoadingText,
}) => {
  const [localState, setLocalState] = React.useState({
    loading,
  });

  React.useEffect(() => {
    setLocalState({ loading });
  }, [loading]);

  const content = (
    <div style={{ minHeight, height: '100%' }}>
      {localState.loading && (
        <div>
          <div className={classes.loading}>
            <LinearProgress
              color="secondary"
              className={classes.loadingIndicator}
            />
          </div>
          {showLoadingText && (
            <div className={classes.loadingText}>Carregando...</div>
          )}
        </div>
      )}
      <Transition animate>{children}</Transition>
    </div>
  );

  return <div>{content}</div>;
};

PageBase.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]),
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  loading: PropTypes.bool,
  minHeight: PropTypes.number,
  showLoadingText: PropTypes.bool,
};

PageBase.defaultProps = {
  children: null,
  loading: true,
  minHeight: 500,
  showLoadingText: false,
};

export default withStyles(
  theme => ({
    ...layoutStyles(theme),
    ...styles(theme),
  }),
  {
    withTheme: true,
  },
)(PageBase);
