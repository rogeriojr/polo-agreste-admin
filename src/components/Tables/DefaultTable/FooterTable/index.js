import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import styled from 'styled-components';

const StyledChildrenBox = styled(Box)`
  && {
    position: relative;
    & > div {
      border-bottom: 0;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

const FooterTable = ({ children, footer }) => (
  <>
    {footer ? (
      <td style={{ display: 'flex' }}>
        <Box flex="1">{footer}</Box>
        <StyledChildrenBox>{children}</StyledChildrenBox>
      </td>
    ) : (
      children
    )}
  </>
);

FooterTable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  footer: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
};

FooterTable.defaultProps = {
  footer: null,
};

export default FooterTable;
