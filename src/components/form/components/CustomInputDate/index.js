import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import LuxonUtils from '@date-io/luxon';
import { ErrorMessage } from 'formik';
import { FormHelperText } from '@material-ui/core';

const StyledKeyboardDatePicker = styled(KeyboardDatePicker)`
  & .MuiInputBase-fullWidth {
    margin-right: -60px;
  }
  & .MuiOutlinedInput-root {
    background: white;
  }
  & .MuiOutlinedInput-input {
    padding: 12px 12px;
  }
  & .MuiInputLabel-outlined[data-shrink='false'] {
    transform: translate(14px, 14px) scale(1);
  }
`;

const CustomInputDate = ({ field, form, label }) => {
  const [selectedDate, handleDateChange] = React.useState(new Date());

  const onChangeHandler = date => {
    if (date && date.isValid) {
      form.setFieldValue(field.name, date.toISODate());
    } else {
      form.setFieldValue(field.name, null);
    }
    handleDateChange(date);
  };

  React.useEffect(() => {
    if (DateTime.fromISO(field.value).isValid) {
      handleDateChange(DateTime.fromISO(field.value));
    } else {
      handleDateChange(null);
    }
  }, []);

  return (
    <MuiPickersUtilsProvider utils={LuxonUtils} locale="pt-br">
      <>
        <StyledKeyboardDatePicker
          clearable
          label={field.label}
          value={selectedDate}
          placeholder={label}
          onChange={onChangeHandler}
          format="dd/MM/yyyy"
          inputVariant="outlined"
          fullWidth
          error={Boolean(form.touched[field.name] && form.errors[field.name])}
          invalidDateMessage=""
        />
        <ErrorMessage name={field.name}>
          {msg => <FormHelperText error>{msg}</FormHelperText>}
        </ErrorMessage>
      </>
    </MuiPickersUtilsProvider>
  );
};

CustomInputDate.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
};

export default CustomInputDate;
