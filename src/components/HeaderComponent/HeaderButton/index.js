import React from 'react';
import { Button, Icon } from '@material-ui/core';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled(Button)`
  && {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    background: #f48a2a;
    padding: 10px;
    color: white;
    &:hover {
      background: #de812d;
    }
  }
`;

const StyledIcon = styled(Icon)`
  && {
    margin-right: 10px;
  }
`;

const SearchButton = ({ icon, children }) => (
  <StyledButton>
    <StyledIcon>{icon}</StyledIcon>
    {children}
  </StyledButton>
);

SearchButton.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
}

export default SearchButton;
