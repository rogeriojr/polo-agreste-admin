import React from 'react';
import PageBase from 'components/PageBase';
import VirtualCatalogForm from 'components/Pages/VirtualCatalogPage/VirtualCatalogForm';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from 'store/ducks/virtualCatalog';
import { push } from 'connected-react-router';

const VirtualCatalogNewPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getVirtualCatalogInsertRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/virtual/catalogs`));
  };

  const { virtualCatalogInsertLoading } = useSelector(
    state => state.virtualCatalog,
  );

  return (
    <PageBase title="Cadastrar Catálogo Virtual">
      <VirtualCatalogForm
        onSubmit={onSubmit}
        handleBack={handleBack}
        isLoading={virtualCatalogInsertLoading}
      />
    </PageBase>
  );
};

export default VirtualCatalogNewPage;
