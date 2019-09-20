import React from 'react';
import { Fab, Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledFab = styled(Fab)`
  && {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    background: #ce4899;
    color: white;
    margin: 0;
    width: 43px;
    height: 43px;
    &:hover {
      background: #b53f86;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }
    &:active {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }
  }
`;

const HeaderFab = ({ icon, ...otherProps }) => (
  <StyledFab
    size="small"
    onClick={otherProps.onClick ? otherProps.onClick : null}
    {...otherProps}
  >
    <Icon>{icon}</Icon>
  </StyledFab>
);

HeaderFab.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default HeaderFab;
