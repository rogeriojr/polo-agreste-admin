/* eslint-disable react/require-default-props */
import React from 'react';
import { Tabs as TabsOriginal, Tab as TabOriginal } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Responsive from 'react-responsive';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const StyledTabs = styled(TabsOriginal)`
  && {
    .MuiTabs-indicator {
      background-color: #ce4899;
    }
  }
`;

export const Tabs = ({ value, onChange, children }) => (
  <>
    <Mobile>
      <div style={{ width: 'calc(100vw - 70px)' }}>
        <StyledTabs
          variant="scrollable"
          scrollButtons="auto"
          value={value}
          onChange={onChange}
        >
          {children}
        </StyledTabs>
      </div>
    </Mobile>
    <Default>
      <StyledTabs variant="fullWidth" value={value} onChange={onChange}>
        {children}
      </StyledTabs>
    </Default>
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
      flex-direction: row;
    }
    .MuiIcon-root {
      margin-right: 10px;
    }
    .MuiTab-wrapper > *:first-child {
      margin-bottom: 0;
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
