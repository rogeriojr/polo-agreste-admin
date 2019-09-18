import React from 'react';
import HeaderButton from 'components/HeaderComponent/HeaderButton';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { Box } from '@material-ui/core';
import SearchInput from 'components/HeaderComponent/SearchInput';

const ClientTableHeader = ({ getFunction, initialValues }) => {
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
            <Field
              component={SearchInput}
              name="search"
              placeholder="Informe uma palavra-chave"
            />
          {/*
          <Box style={{ padding: '0 6px', paddingRight: 12 }}>
              <HeaderButton icon="get_app">Exportar</HeaderButton>
            </Box>
          */}
            </Box>
        </Form>
      )}
    />
  );
};

ClientTableHeader.propTypes = {
  getFunction: PropTypes.func.isRequired,
  initialValues: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ClientTableHeader;
