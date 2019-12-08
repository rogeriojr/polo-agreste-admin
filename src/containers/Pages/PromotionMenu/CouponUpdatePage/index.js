import React from 'react';
import PageBase from 'components/PageBase';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProductCreators } from 'store/ducks/coupon';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import CouponForm from 'components/Pages/CouponPage/CouponForm';
import { withRouter } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

const CouponUpdatePage = ({ match }) => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState(null);

  const { coupon, couponLoading } = useSelector(state => state.coupon);

  const getInitialData = () => {
    const { params } = match;
    dispatch(ProductCreators.getCouponRequest({ id: params.id }));
    setLocalState(null);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    const { params } = match;
    if (
      Object.keys(coupon).length > 0 &&
      !couponLoading &&
      coupon.id === Number(params.id)
    ) {
      setLocalState({
        ...coupon,
      });
    }
  }, [coupon]);

  const onSubmit = data => {
    dispatch(ProductCreators.getCouponUpdateRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/promotion/coupons`));
  };

  return (
    <PageBase>
      <HeaderComponent title="Atualizar cupom" />
      {localState && (
        <CouponForm
          initialValues={localState}
          handleBack={handleBack}
          onSubmit={onSubmit}
        />
      )}
    </PageBase>
  );
};

CouponUpdatePage.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(CouponUpdatePage);
