import React from 'react';
import PageBase from 'components/PageBase';
import SizeForm from 'components/Pages/SizePage/SizeForm';
import { useDispatch } from 'react-redux';
import { Creators } from 'store/ducks/productSize';
import { push } from 'connected-react-router';

const SizeNewPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getProductSizeInsertRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/catalog/sizes`));
  };

  return (
    <PageBase title="Cadastrar tamanho">
      <SizeForm onSubmit={onSubmit} handleBack={handleBack} />
    </PageBase>
  );
};

export default SizeNewPage;
