import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core';
import { Tab, Tabs } from 'components/Layout/Tabs';

import ProductHistoricImport from 'components/Pages/ProductPage/ProductImport/ProductHistoricImport';
import ProductStoreInfo from 'components/Pages/ProductPage/ProductImport/ProductImportInfo';
import ProductImportInstructions from 'components/Pages/ProductPage/ProductImport/ProductImportInstructions';
import ProductImportConfig from 'components/Pages/ProductPage/ProductImport/ProductImportConfig';

const TabContainer = ({ children }) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const ProductImportPage = ({ submitText, handleBack }) => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmitConfig = () => {
    alert('olá');
  };

  return (
    <>
      <Card style={{ marginTop: 20, padding: 10 }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="COMO FUNCIONA" />
          <Tab label="CONFIGURAÇÕES" />
          <Tab label="HISTÓRICO DE IMPORTAÇÕES" />
        </Tabs>
        {value === 0 && (
          <TabContainer>
            <ProductImportInstructions />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <ProductImportConfig
              submitText={submitText}
              handleBack={handleBack}
              onSubmit={onSubmitConfig}
            />
          </TabContainer>
        )}
        {value === 2 && <ProductHistoricImport />}
      </Card>
      {value === 0 && <ProductStoreInfo />}
    </>
  );
};

ProductImportPage.propTypes = {
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

ProductImportPage.defaultProps = {
  submitText: 'Salvar',
  handleBack: ()=>{},
};

export default ProductImportPage;
