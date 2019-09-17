import React from 'react';
import { Link } from 'react-router-dom';
import HeaderFab from 'components/HeaderComponent/HeaderFab';
import HeaderButton from 'components/HeaderComponent/HeaderButton';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { Box } from '@material-ui/core';
import SearchInput from 'components/HeaderComponent/SearchInput';

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
          <Box display="flex" flexDirection="row">
            <Box style={{ paddingTop: 12, paddingRight: 12 }}>Busca</Box>
            <Box>
              <Field
                component={SearchInput}
                name="search"
                placeholder="Informe uma palavra-chave"
              />
            </Box>
            <Box style={{ padding: '0 12px' }}>
              <HeaderButton icon="search">Busca Avançada</HeaderButton>
            </Box>
            <Box style={{ padding: '0 6px', paddingLeft: '0' }}>
              <HeaderButton icon="get_app">Exportar</HeaderButton>
            </Box>
            <Box style={{ padding: '0 6px', paddingRight: '12px' }}>
              <Link to="/product/new">
                <HeaderFab icon="add" />
              </Link>
            </Box>
            <Box>
              <HeaderFab icon="dns" />
            </Box>
          </Box>
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
