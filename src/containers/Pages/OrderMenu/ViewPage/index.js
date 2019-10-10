import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as OrderCreators } from 'store/ducks/order';
import PageBase from 'components/PageBase';
import OrderView from 'components/Pages/OrderPage/OrderView';
import PropTypes from 'prop-types';

const ViewPage = ({ match }) => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState(null);

  const { order, orderLoading } = useSelector(state => state.order);

  const getInitialData = () => {
    const { params } = match;
    dispatch(OrderCreators.getOrderRequest({ id: params.id }));
    setLocalState(null);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    const { params } = match;
    if (
      Object.keys(order).length > 0 &&
      !orderLoading &&
      order.id === Number(params.id)
    ) {
      setLocalState(order);
    }
  }, [order]);

  return (
    <PageBase>{localState && <OrderView orderInfo={localState} />}</PageBase>
  );
};

ViewPage.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ViewPage;
