import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import styles from './styles';

const PageTitleContainer = styled('div')`
  display: flex;
  align-items: center;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;


const PageHeader = ({ title, children, classes }) => (
  <PageTitleContainer>
    <div className={classes.pageTitle}>
      <Typography variant="h6" className="page-title-text">
        {title}
      </Typography>
    </div>
    <div className={classes.pageTitleContent}>{children}</div>
  </PageTitleContainer>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withStyles(theme => styles(theme))(PageHeader);
