import React from 'react';
import { Fab, Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const StyledFab = styled(Fab)`
  && {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    background: #003B40;
    color: white;
    width: 32px;
    height: 32px;
    margin: 0 2px;
    min-height: 0;
    &:hover {
      background: #003B40;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }
    &:active {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }
  }
`;

const StyledIcon = styled(Icon)`
  && {
    width: auto;
    height: auto;
    font-size: 22px;
    text-align: center;
  }
`;

const CustomCircularProgress = styled(CircularProgress)`
  && {
    color: #fff;
  }
`;

const ActionFab = ({ icon, isLoading, ...otherProps }) => (
  <StyledFab
    size="small"
    onClick={otherProps.onClick ? otherProps.onClick : null}
    {...otherProps}
  >
    {!isLoading ? (
      <StyledIcon>{icon}</StyledIcon>
    ) : (
      <CustomCircularProgress size={22} />
    )}
  </StyledFab>
);

ActionFab.propTypes = {
  icon: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

ActionFab.defaultProps = {
  isLoading: false,
}

export default ActionFab;
