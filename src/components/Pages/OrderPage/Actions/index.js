import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import layoutStyles from 'containers/Layout/styles';

import Fab from '@material-ui/core/Fab';

import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PrintIcon from '@material-ui/icons/Print';
import DeleteIcon from '@material-ui/icons/Delete';

const Actions = ({ rowData, classes }) => (
  <div>
    <Fab
      className={classNames(classes.fab, classes.fabAction)}
      onClick={() => window.location.assign()}
    >
      <RemoveRedEyeIcon className={classNames(classes.iconAction)} />
    </Fab>
    <Fab className={classNames(classes.fab, classes.fabAction)}>
      <BookmarkIcon className={classNames(classes.iconAction)} />
    </Fab>
    <Fab className={classNames(classes.fab, classes.fabAction)}>
      <PrintIcon className={classNames(classes.iconAction)} />
    </Fab>
    <Fab className={classNames(classes.fab, classes.fabAction)}>
      <DeleteIcon className={classNames(classes.iconAction)} />
    </Fab>
  </div>
);

Actions.propTypes = {
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withStyles(theme => layoutStyles(theme), {
  withTheme: true,
})(Actions);
