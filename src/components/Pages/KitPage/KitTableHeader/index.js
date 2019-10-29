import React from 'react';
import SearchInput from 'components/HeaderComponent/SearchInput';
import HeaderButton from 'components/HeaderComponent/HeaderButton';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import HeaderBoxContainer from 'components/HeaderComponent/HeaderBoxContainer';
import HeaderBoxItem from 'components/HeaderComponent/HeaderBoxItem';

const KitTableHeader = ({ getFunction, initialValues }) => {
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
            <HeaderBoxItem style={{ paddingLeft: 6 }}>
              <Link to="/catalog/kits/new">
                <HeaderButton icon="add">Adicionar</HeaderButton>
              </Link>
            </HeaderBoxItem>
          </HeaderBoxContainer>
        </Form>
      )}
    />
  );
};

KitTableHeader.propTypes = {
  getFunction: PropTypes.func.isRequired,
  initialValues: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default KitTableHeader;
