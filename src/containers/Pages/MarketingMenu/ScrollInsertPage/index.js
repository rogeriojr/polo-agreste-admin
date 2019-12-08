import React from 'react';
import PageBase from 'components/PageBase';
import ScrollForm from 'components/Pages/ScrollPage/ScrollForm';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from 'store/ducks/scroll';
import HeaderComponent from 'components/HeaderComponent';
import { push } from 'connected-react-router';

const ScrollNewPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getScrollInsertRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/marketing/scrolls`));
  };

  const { scrollInsertLoading } = useSelector(state => state.scroll);

  return (
    <PageBase>
      <HeaderComponent title="Cadastrar scroll" />
      <ScrollForm
        onSubmit={onSubmit}
        handleBack={handleBack}
        isLoading={scrollInsertLoading}
      />
    </PageBase>
  );
};

export default ScrollNewPage;
