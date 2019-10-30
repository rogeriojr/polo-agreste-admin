import React from 'react';
import PageBase from 'components/PageBase';
import BannerForm from 'components/Pages/BannerPage/BannerForm';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from 'store/ducks/banner';
import HeaderComponent from 'components/HeaderComponent';
import { push } from 'connected-react-router';

const BannerNewPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getBannerInsertRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/marketing/banners`));
  };

  const { bannerInsertLoading } = useSelector(state => state.banner);

  return (
    <PageBase>
      <HeaderComponent title="Cadastrar banner" />
      <BannerForm
        onSubmit={onSubmit}
        handleBack={handleBack}
        isLoading={bannerInsertLoading}
      />
    </PageBase>
  );
};

export default BannerNewPage;
