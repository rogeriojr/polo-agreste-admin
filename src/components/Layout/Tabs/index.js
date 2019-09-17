/* eslint-disable react/require-default-props */
import React from 'react';
import { Tabs as TabsOriginal, Tab as TabOriginal } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTabs = styled(TabsOriginal)`
  && {
    .MuiTabs-indicator {
      background-color: #ce4899;
    }
  }
`;

export const Tabs = ({ value, onChange, children }) => (
  <>
    <StyledTabs variant="fullWidth" value={value} onChange={onChange}>
      {children}
    </StyledTabs>
  </>
);

Tabs.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.array.isRequired,
  ]).isRequired,
};

const StyledTab = styled(TabOriginal)`
  && {
    .MuiTab-textColorInherit {
      opacity: 1;
    }
    .MuiTab-wrapper {
      color: rgba(0, 0, 0, 0.38);
    }
    &[aria-selected='true'] .MuiTab-wrapper {
      color: #ce4899;
    }
  }
`;
export const Tab = props => (
  <>
    <StyledTab fullWidth {...props} />
  </>
);
