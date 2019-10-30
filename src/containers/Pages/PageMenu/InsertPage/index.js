import React from 'react';
import PageBase from 'components/PageBase';
import PageForm from 'components/Pages/PageComponents/PageForm';
import { useDispatch } from 'react-redux';
import { Creators } from 'store/ducks/page';
import { push } from 'connected-react-router';

const PageNewPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getPageInsertRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/pages`));
  };

  return (
    <PageBase title="Cadastrar Página">
      <PageForm onSubmit={onSubmit} handleBack={handleBack} />
    </PageBase>
  );
};

export default PageNewPage;
