import React from 'react';
import PageBase from 'components/PageBase';
import KitForm from 'components/Pages/KitPage/KitForm';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from 'store/ducks/kit';
import HeaderComponent from 'components/HeaderComponent';
import { push } from 'connected-react-router';

const KitNewPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getKitInsertRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/catalog/kits`));
  };

  const { kitInsertLoading } = useSelector(state => state.kit);

  return (
    <PageBase>
      <HeaderComponent title="Cadastrar kit" />
      <KitForm
        onSubmit={onSubmit}
        handleBack={handleBack}
        isLoading={kitInsertLoading}
      />
    </PageBase>
  );
};

export default KitNewPage;
