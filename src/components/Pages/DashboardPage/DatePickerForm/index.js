import React from 'react';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import { Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import PropTypes from 'prop-types';
import CustomDateRange from 'components/form/components/CustomDateRange';
import HeaderBoxContainer from 'components/HeaderComponent/HeaderBoxContainer';
import HeaderBoxItem from 'components/HeaderComponent/HeaderBoxItem';

const formInitialValues = {
  startDate: '',
  endDate: '',
};

const schema = Yup.object().shape({
  startDate: Yup.date().typeError('Data inválida'),
  endDate: Yup.date().typeError('Data inválida'),
});

const DatePickerForm = ({ onSubmit, initialValues }) => {
  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues || formInitialValues}
      onSubmit={onSubmit}
      render={() => (
        <Form>
          <HeaderBoxContainer>
            <HeaderBoxItem style={{ paddingTop: 12, paddingRight: 6 }}>
              Busca
            </HeaderBoxItem>
            <HeaderBoxItem style={{ paddingLeft: 6, paddingRight: 6 }}>
              <Field name="dateStartEnd" component={CustomDateRange} />
            </HeaderBoxItem>
            <HeaderBoxItem style={{ paddingLeft: 6, paddingRight: 0 }}>
              <Fab size="small" className="fab-custom" type="submit">
                <SearchIcon />
              </Fab>
            </HeaderBoxItem>
          </HeaderBoxContainer>
        </Form>
      )}
    />
  );
};

DatePickerForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
};

DatePickerForm.defaultProps = {
  initialValues: formInitialValues,
  onSubmit: () => {},
};

export default DatePickerForm;
