import React from 'react';
import { Link } from 'react-router-dom';
import HeaderFab from 'components/HeaderComponent/HeaderFab';
import HeaderButton from 'components/HeaderComponent/HeaderButton';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import SearchInput from 'components/HeaderComponent/SearchInput';
import HeaderBoxContainer from 'components/HeaderComponent/HeaderBoxContainer';
import HeaderBoxItem from 'components/HeaderComponent/HeaderBoxItem';

const ProductTableHeader = ({ getFunction, initialValues }) => {
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
            <HeaderBoxItem style={{ paddingTop: 12, paddingRight: 12 }}>
              Busca
            </HeaderBoxItem>
            <HeaderBoxItem>
              <Field
                component={SearchInput}
                name="search"
                placeholder="Informe uma palavra-chave"
              />
            </HeaderBoxItem>
            <HeaderBoxItem style={{ paddingLeft: 12, paddingRight: 6 }}>
              <HeaderButton icon="search">Busca Avançada</HeaderButton>
            </HeaderBoxItem>
            {/*
            <HeaderBoxItem style={{ paddingRight: 6, paddingLeft: '0' }}>
              <HeaderButton icon="get_app">Exportar</HeaderButton>
            </HeaderBoxItem>
            */}
            <HeaderBoxItem style={{ paddingLeft: 6, paddingRight: '12px' }}>
              <Link to="/product/new">
                <HeaderFab icon="add" />
              </Link>
            </HeaderBoxItem>
            <HeaderBoxItem>
              <HeaderFab icon="dns" />
            </HeaderBoxItem>
          </HeaderBoxContainer>
        </Form>
      )}
    />
  );
};

ProductTableHeader.propTypes = {
  getFunction: PropTypes.func.isRequired,
  initialValues: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ProductTableHeader;
