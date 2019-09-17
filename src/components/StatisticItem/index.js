import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import styles from './styles';

const StatisticItem = ({ classes, icon, title, description }) => (
  <Paper className={classes.statContainer}>
    <div className={classes.statIconContainer}>
      <Icon className={classes.statIcon}>{icon}</Icon>
    </div>
    <div className={classes.statContent}>
      <Typography variant="body1" className={classes.statTitle}>
        {title}
      </Typography>
      <Typography variant="body2" className={classes.statDescription}>
        {description}
      </Typography>
    </div>
  </Paper>
);

StatisticItem.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default withStyles(theme => styles(theme))(StatisticItem);
