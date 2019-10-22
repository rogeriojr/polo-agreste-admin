import React from 'react';
import { FormHelperText, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ErrorMessage } from 'formik';
import InputMask from 'react-input-mask';

const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      background: white;
    }
    & .MuiOutlinedInput-input {
      padding: 12px 12px;
    }
    & .MuiInputLabel-outlined[data-shrink='false'] {
      transform: translate(14px, 14px) scale(1);
    }
  }
`;

const CustomMaskField = ({ mask, field, label, form, ...otherProps }) => {
  return (
    <>
      <InputMask
        {...field}
        {...otherProps}
        fullWidth
        variant="outlined"
        label={label}
        mask={mask}
        error={Boolean(form.touched[field.name] && form.errors[field.name])}
      >
        {inputProps => <StyledTextField {...inputProps} />}
      </InputMask>
      <ErrorMessage name={field.name}>
        {msg => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </>
  );
};

CustomMaskField.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
  mask: PropTypes.string,
};

CustomMaskField.defaultProps = {
  mask: '',
};

export default CustomMaskField;
