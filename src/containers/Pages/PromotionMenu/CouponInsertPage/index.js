import React from 'react';
import PageBase from 'components/PageBase';
import CouponForm from 'components/Pages/CouponPage/CouponForm';
import { useDispatch } from 'react-redux';
import { Creators } from 'store/ducks/coupon';
import { push } from 'connected-react-router';

const CouponNewPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getCouponInsertRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/promotion/coupons`));
  };

  return (
    <PageBase title="Cadastrar Cupom">
      <CouponForm onSubmit={onSubmit} handleBack={handleBack} />
    </PageBase>
  );
};

export default CouponNewPage;
