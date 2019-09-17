import React from 'react';
import PageBase from 'components/PageBase';
import ProductForm from 'components/Pages/ProductPage/ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from 'store/ducks/product';
import HeaderComponent from 'components/HeaderComponent';

const ProductNewPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getProductInsertRequest(data));
  };

  const { productInsertLoading } = useSelector(state => state.product);

  return (
    <PageBase>
      <HeaderComponent title="Cadastrar produto" />
      <ProductForm onSubmit={onSubmit} isLoading={productInsertLoading} />
    </PageBase>
  );
};

export default ProductNewPage;
