import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.div`
  && {
    display: flex;
    flex: 1;
    flex-direction: row;
    margin: 15px 0;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const StyledTypography = styled(Typography)`
  && {
    font-weight: 300;
    flex: 1;
  }
`;

const HeaderComponent = ({ title, variant, children }) => (
  <StyledContainer>
    <StyledTypography variant={variant} gutterBottom>
      {title}
    </StyledTypography>
    <>{children}</>
  </StyledContainer>
);

HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.object,
  ]),
};

HeaderComponent.defaultProps = {
  children: null,
  variant: 'h4',
};

export default HeaderComponent;
