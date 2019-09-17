import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const PageHeader = ({ title, children, classes }) => (
  <div className={classes.pageTitleContainer}>
    <div className={classes.pageTitle}>
      <Typography variant="h6" className="page-title-text">
        {title}
      </Typography>
    </div>
    <div className={classes.pageTitleContent}>{children}</div>
  </div>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withStyles(theme => styles(theme))(PageHeader);
