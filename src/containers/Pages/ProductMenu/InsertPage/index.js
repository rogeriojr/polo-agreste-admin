import React from 'react';
import PageBase from 'components/PageBase';
import ProductForm from 'components/Pages/ProductPage/ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from 'store/ducks/product';
import HeaderComponent from 'components/HeaderComponent';
import { push } from 'connected-react-router';

const ProductNewPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getProductInsertRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/product`));
  };

  const { productInsertLoading } = useSelector(state => state.product);

  return (
    <PageBase>
      <HeaderComponent title="Cadastrar produto" />
      <ProductForm
        onSubmit={onSubmit}
        handleBack={handleBack}
        isLoading={productInsertLoading}
      />
    </PageBase>
  );
};

export default ProductNewPage;
