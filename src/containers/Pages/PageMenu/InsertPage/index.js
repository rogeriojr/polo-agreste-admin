import React from 'react';
import PageBase from 'components/PageBase';
import PageForm from 'components/Pages/PageComponents/PageForm';
import { useDispatch } from 'react-redux';
import { Creators } from 'store/ducks/page';

const PageNewPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getPageInsertRequest(data));
  };

  return (
    <PageBase title="Cadastrar Página">
      <PageForm onSubmit={onSubmit} />
    </PageBase>
  );
};

export default PageNewPage;
