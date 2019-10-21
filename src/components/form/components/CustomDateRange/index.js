import React from 'react';
import { TextField, FormHelperText, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ErrorMessage } from 'formik';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import 'moment/locale/pt-br';

const CustomDateRange = ({
  field,
  form: { values, setFieldValue },
  ...props
}) => {
  const [localState, setLocalState] = React.useState({
    focusedInput: null,
    startDateId: null,
    endDateId: null,
  });

  const onDatesChange = ({ startDate, endDate }) => {
    setFieldValue(
      'dateStart',
      startDate ? startDate.format('YYYY-MM-DD') : null,
    );
    setFieldValue('dateEnd', endDate ? endDate.format('YYYY-MM-DD') : null);
  };

  const onFocusChange = focusedInput => {
    setLocalState({
      ...localState,
      focusedInput,
    });
  };

  const convDate = date => {
    if (date !== null) {
      return moment(date);
    }
    return null;
  };

  React.useEffect(() => {
    const dt = new Date();
    const time = dt.getTime();
    const rand = Math.random();
    moment.locale('pt-br');
    setLocalState({
      ...localState,
      startDateId: `sd_${time}_${rand}`,
      endDateId: `ed_${time}_${rand}`,
    });
    if (!values.dateStart) {
      setFieldValue('dateStart', null);
    }
    if (!values.dateEnd) {
      setFieldValue('dateEnd', null);
    }
  }, []);

  return (
    <>
      <DateRangePicker
        startDate={convDate(values.dateStart)} // momentPropTypes.momentObj or null,
        startDateId={localState.startDateId} // PropTypes.string.isRequired,
        endDate={convDate(values.dateEnd)} // momentPropTypes.momentObj or null,
        endDateId={localState.endDateId} // PropTypes.string.isRequired,
        onDatesChange={onDatesChange} // PropTypes.func.isRequired,
        focusedInput={localState.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={onFocusChange} // PropTypes.func.isRequired,
        startDatePlaceholderText="Data inicial"
        endDatePlaceholderText="Data final"
        isOutsideRange={() => false}
      />
      <ErrorMessage name={field.name}>
        {msg => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </>
  );
};

CustomDateRange.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CustomDateRange;