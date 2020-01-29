import React from 'react';
import { FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import 'moment/locale/pt-br';
import Responsive from 'react-responsive';


const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const CustomDateRange = ({
  field,
  form: { values, setFieldValue },
  dateStartField,
  dateEndField,
  ...props
}) => {
  const [localState, setLocalState] = React.useState({
    focusedInput: null,
    startDateId: null,
    endDateId: null,
  });

  const onDatesChange = ({ startDate, endDate }) => {
    setFieldValue(
      dateStartField,
      startDate ? startDate.format('YYYY-MM-DD') : null,
    );
    setFieldValue(dateEndField, endDate ? endDate.format('YYYY-MM-DD') : null);
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
    if (!values[dateStartField]) {
      setFieldValue(dateStartField, null);
    }
    if (!values[dateEndField]) {
      setFieldValue(dateEndField, null);
    }
  }, []);

  return (
    <>
      <Mobile>
        <DateRangePicker
          startDate={convDate(values[dateStartField])} // momentPropTypes.momentObj or null,
          startDateId={localState.startDateId} // PropTypes.string.isRequired,
          endDate={convDate(values[dateEndField])} // momentPropTypes.momentObj or null,
          endDateId={localState.endDateId} // PropTypes.string.isRequired,
          onDatesChange={onDatesChange} // PropTypes.func.isRequired,
          focusedInput={localState.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={onFocusChange} // PropTypes.func.isRequired,
          startDatePlaceholderText="Data inicial"
          hideKeyboardShortcutsPanel
          endDatePlaceholderText="Data final"
          isOutsideRange={() => false}
          numberOfMonths={1}
        />
      </Mobile>
      <Default>
        <DateRangePicker
         hideKeyboardShortcutsPanel
          startDate={convDate(values[dateStartField])} // momentPropTypes.momentObj or null,
          startDateId={localState.startDateId} // PropTypes.string.isRequired,
          endDate={convDate(values[dateEndField])} // momentPropTypes.momentObj or null,
          endDateId={localState.endDateId} // PropTypes.string.isRequired,
          onDatesChange={onDatesChange} // PropTypes.func.isRequired,
          focusedInput={localState.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={onFocusChange} // PropTypes.func.isRequired,
          startDatePlaceholderText="Data inicial"
          endDatePlaceholderText="Data final"
          isOutsideRange={() => false}
        />
      </Default>
      <ErrorMessage name={field.name}>
        {msg => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </>
  );
};

CustomDateRange.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dateStartField: PropTypes.string,
  dateEndField: PropTypes.string,
};

CustomDateRange.defaultProps = {
  dateStartField: 'dateStart',
  dateEndField: 'dateEnd',
};

export default CustomDateRange;