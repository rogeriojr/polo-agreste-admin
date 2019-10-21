import React from 'react';
import PropTypes from 'prop-types';
import { FaBarcode } from 'react-icons/fa';
import { Icon } from '@material-ui/core';

const OrderPaymentType = ({ rowData }) => {
  const paymentType = Number(rowData.payment_type);
  return (
    <>
      {paymentType === 1 && (
        <>
          <Icon style={{ verticalAlign: 'bottom', paddingTop: 2 }}>
            credit_card
          </Icon>{' '}
          Cartão
        </>
      )}
      {paymentType === 2 && (
        <>
          <FaBarcode
            fontSize={20}
            style={{ paddingLeft: 3, verticalAlign: 'bottom', paddingTop: 0 }}
          />{' '}
          Boleto
        </>
      )}
    </>
  );
};

OrderPaymentType.propTypes = {
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default OrderPaymentType;
