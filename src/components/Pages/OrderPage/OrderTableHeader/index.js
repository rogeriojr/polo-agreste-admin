import React from 'react';

import HeaderButton from 'components/HeaderComponent/HeaderButton';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import SearchInput from 'components/HeaderComponent/SearchInput';
import HeaderBoxContainer from 'components/HeaderComponent/HeaderBoxContainer';
import HeaderBoxItem from 'components/HeaderComponent/HeaderBoxItem';
import CustomInputDate from 'components/form/components/CustomInputDate';
import CustomTextField from 'components/form/components/CustomTextField';
import HeaderFab from 'components/HeaderComponent/HeaderFab';
import CustomDateRange from 'components/form/components/CustomDateRange';

const OrderTableHeader = ({ getFunction, initialValues }) => {
  const onSubmit = values => {
    getFunction(values);
  };

  

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={() => (
        <Form>
          <HeaderBoxContainer>
            <HeaderBoxItem style={{ paddingTop: 12, paddingRight: 6 }}>
              Busca
            </HeaderBoxItem>
            {/*
            <HeaderBoxItem style={{ paddingLeft: 6, paddingRight: 6 }}>
              <Field
                component={CustomInputDate}
                name="dateStart"
                label="Data inicial"
              />
            </HeaderBoxItem>
            <HeaderBoxItem style={{ paddingLeft: 6, paddingRight: 6 }}>
              <Field
                component={CustomInputDate}
                name="dateEnd"
                label="Data final"
              />
            </HeaderBoxItem>
            */}
            <HeaderBoxItem style={{ paddingLeft: 6, paddingRight: 6 }}>
              <Field name="dateStartEnd" component={CustomDateRange} />
            </HeaderBoxItem>
            <HeaderBoxItem style={{ paddingLeft: 6, paddingRight: 6 }}>
              <Field
                component={CustomTextField}
                name="search"
                placeholder="Informe uma palavra-chave"
              />
            </HeaderBoxItem>
            <HeaderBoxItem style={{ paddingLeft: 6, paddingRight: 6 }}>
              <HeaderFab icon="search" type="submit" />
            </HeaderBoxItem>
            <HeaderBoxItem style={{ paddingLeft: 6, paddingRight: 0 }}>
              <HeaderButton icon="search">Busca Avançada</HeaderButton>
            </HeaderBoxItem>
            {/*
            <HeaderBoxItem style={{ paddingLeft: 6 }}>
              <HeaderButton icon="get_app">Exportar</HeaderButton>
            </HeaderBoxItem>
            */}
          </HeaderBoxContainer>
        </Form>
      )}
    />
  );
};

OrderTableHeader.propTypes = {
  getFunction: PropTypes.func.isRequired,
  initialValues: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default OrderTableHeader;
