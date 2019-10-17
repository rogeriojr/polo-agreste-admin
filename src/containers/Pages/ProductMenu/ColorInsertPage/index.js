import React from 'react';
import PageBase from 'components/PageBase';
import ColorForm from 'components/Pages/ColorPage/ColorForm';
import { useDispatch } from 'react-redux';
import { Creators } from 'store/ducks/productColor';
import { push } from 'connected-react-router';

const ColorNewPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getProductColorInsertRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/color`));
  };

  return (
    <PageBase title="Cadastrar Cor">
      <ColorForm onSubmit={onSubmit} handleBack={handleBack} />
    </PageBase>
  );
};

export default ColorNewPage;
