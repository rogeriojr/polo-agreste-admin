import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

const StyledButton = styled(Button)`
  && {
    background-color: #3bbcd4;
    color: #fff;
    &:hover {
      background-color: #319db1;
    }
    &.Mui-disabled {
      color: #fff;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background-color: rgba(120, 120, 120, 0.2);
      }
    }
  }
`;

const CustomCircularProgress = styled(CircularProgress)`
  && {
    color: #fff;
    margin-right: 10px;
  }
`;

const CustomButton = ({ label, onClick, Icon, isLoading, ...rest }) => (
  <>
    <StyledButton
      {...rest}
      color="primary"
      variant="text"
      onClick={onClick}
      disabled={isLoading}
    >
      {!isLoading ? (
        Icon && <Icon style={{ marginRight: 10 }} />
      ) : (
        <CustomCircularProgress size={16} />
      )}{' '}
      {label}
    </StyledButton>
  </>
);

CustomButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  Icon: PropTypes.oneOfType([PropTypes.any, PropTypes.bool]),
  isLoading: PropTypes.bool,
};

CustomButton.defaultProps = {
  Icon: false,
  label: 'Label',
  onClick: () => {},
  isLoading: false,
};

export default CustomButton;
