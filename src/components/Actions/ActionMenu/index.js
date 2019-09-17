import React from 'react';
import styled from 'styled-components';
import { Menu } from '@material-ui/core';

const StyledMenu = styled(Menu)`
  && {
    & .MuiMenu-list {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
`;

const ActionMenuItem = props => <StyledMenu {...props} />;

export default ActionMenuItem;
