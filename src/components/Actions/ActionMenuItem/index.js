import React from 'react';
import styled from 'styled-components';
import { MenuItem } from '@material-ui/core';

const StyledMenuItem = styled(MenuItem)`
  && {
    border-bottom: 1px solid rgba(0, 0, 0, 0.18);
    &:last-child {
      border-bottom: none;
    }
    & a {
      color: inherit !important;
      width: 100%;
      display: block;
    }
  }
`;

const ActionMenuItem = React.forwardRef((props, ref) => (
  <StyledMenuItem {...props} ref={ref} />
));

export default ActionMenuItem;
