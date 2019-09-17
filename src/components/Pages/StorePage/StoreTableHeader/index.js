import React from 'react';
import { Link } from 'react-router-dom';
import HeaderFab from 'components/HeaderComponent/HeaderFab';
import HeaderButton from 'components/HeaderComponent/HeaderButton';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import SearchInput from 'components/HeaderComponent/SearchInput';
import HeaderBoxContainer from 'components/HeaderComponent/HeaderBoxContainer';
import HeaderBoxItem from 'components/HeaderComponent/HeaderBoxItem';

const StoreTableHeader = ({ getFunction, initialValues }) => {
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
            <HeaderBoxItem style={{ paddingLeft: 6, paddingRight: 6 }}>
              <Field
                component={SearchInput}
                name="search"
                placeholder="Informe uma palavra-chave"
              />
            </HeaderBoxItem>
            <HeaderBoxItem style={{ paddingLeft: 6, paddingRight: 6 }}>
              <HeaderButton icon="search">Busca Avançada</HeaderButton>
            </HeaderBoxItem>
            <HeaderBoxItem style={{ paddingLeft: 6 }}>
              <Link to="/store/new">
                <HeaderFab icon="add" />
              </Link>
            </HeaderBoxItem>
          </HeaderBoxContainer>
        </Form>
      )}
    />
  );
};

StoreTableHeader.propTypes = {
  getFunction: PropTypes.func.isRequired,
  initialValues: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default StoreTableHeader;
