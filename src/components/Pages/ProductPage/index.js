import React from 'react';
import PageBase from 'components/PageBase';
import ProductImportStock from 'components/Pages/ProductPage/ProductImportStock';
import { useDispatch } from 'react-redux';
import { Creators } from 'store/ducks/product';
import HeaderComponent from 'components/HeaderComponent';

const ProductNewPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getProductInsertRequest(data));
  };

  return (
    <PageBase>
      <HeaderComponent title="Importar Estoque" />
      <ProductImportStock onSubmit={onSubmit} />
    </PageBase>
  );
};

export default ProductNewPage;
