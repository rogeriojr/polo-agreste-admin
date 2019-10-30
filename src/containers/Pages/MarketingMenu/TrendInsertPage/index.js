import React from 'react';
import PageBase from 'components/PageBase';
import TrendForm from 'components/Pages/TrendPage/TrendForm';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from 'store/ducks/trend';
import HeaderComponent from 'components/HeaderComponent';
import { push } from 'connected-react-router';

const TrendNewPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getTrendInsertRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/marketing/trends`));
  };

  const { trendInsertLoading } = useSelector(state => state.trend);

  return (
    <PageBase>
      <HeaderComponent title="Cadastrar tendência" />
      <TrendForm
        onSubmit={onSubmit}
        handleBack={handleBack}
        isLoading={trendInsertLoading}
      />
    </PageBase>
  );
};

export default TrendNewPage;
