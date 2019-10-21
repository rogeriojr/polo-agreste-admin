import React from 'react';
import PropTypes from 'prop-types';
import { FaBarcode } from 'react-icons/fa';
import { Icon } from '@material-ui/core';

const OrderPaymentType = ({ rowData }) => {
  const paymentType = Number(rowData.payment_type);
  return (
    <>
      {paymentType === 1 && <Icon>credit_card</Icon>}
      {paymentType === 2 && (
        <FaBarcode fontSize={20} style={{ paddingLeft: 3 }} />
      )}
    </>
  );
};

OrderPaymentType.propTypes = {
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default OrderPaymentType;
