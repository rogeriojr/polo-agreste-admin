import React from 'react';
import { Select, OutlinedInput } from '@material-ui/core';
import styled from 'styled-components';

const StyledOutlinedInput = styled(OutlinedInput)`
  & .MuiOutlinedInput-root{
    background: white;
  }
  & .MuiOutlinedInput-input{
    padding: 12px 24px 12px 12px;
  }
  & .MuiInputLabel-outlined[data-shrink='false']{
    transform: translate(14px, 14px) scale(1);
  }
`

const CustomSelect = props => (
  <Select {...props} input={<StyledOutlinedInput />} />
);

export default CustomSelect;