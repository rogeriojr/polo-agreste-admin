import React from 'react';
import PageBase from 'components/PageBase';
import StoreForm from 'components/Pages/StorePage/StoreForm';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from 'store/ducks/stores';

const StoreNewPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getStoreInsertRequest(data));
  };

  const { storeInsertLoading } = useSelector(state => state.store);

  return (
    <PageBase title="Cadastrar Loja">
      <StoreForm onSubmit={onSubmit} isLoading={storeInsertLoading} />
    </PageBase>
  );
};

export default StoreNewPage;
