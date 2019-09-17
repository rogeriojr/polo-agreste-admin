import React from 'react';
import { Fab, Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledFab = styled(Fab)`
  && {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    background: #f48a2a;
    color: white;
    width: 32px;
    height: 32px;
    margin: 0 2px;
    min-height: 0;
    &:hover {
      background: #de812d;
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

const ActionFab = ({ icon, ...otherProps }) => (
  <StyledFab
    size="small"
    onClick={otherProps.onClick ? otherProps.onClick : null}
  >
    <StyledIcon>{icon}</StyledIcon>
  </StyledFab>
);

ActionFab.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default ActionFab;
