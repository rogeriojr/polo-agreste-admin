import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography } from '@material-ui/core';
import { Formik, Field, Form, FastField } from 'formik';
import FormButtons from 'components/form/components/FormButtons';
import CustomCurrencyField from 'components/form/components/CustomCurrencyField';
import * as Yup from 'yup';
import { toPrice } from 'utils/converters';
import { useSelector } from 'react-redux';

const ModalContainer = styled(Paper)`
  && {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    @media (max-width: 968px) {
      width: 70%;
    }
    @media (max-width: 768px) {
      width: 90%;
    }
    padding: 30px;
  }
`;

const WithDrawInfoItemLabel = styled('div')`
  && {
    color: #003B40;
  }
`;

const initialValues = {
  value: '',
};

const schema = Yup.object().shape({
  value: Yup.string().required('Campo obrigatório'),
});

const WithDrawInfoItem = ({ label, children }) => (
  <Grid item lg={4} sm={6} xs={12}>
    <WithDrawInfoItemLabel>{label}</WithDrawInfoItemLabel>
    {children}
  </Grid>
);

const PaymentContainer = styled(Grid)`
  && {
    margin-top: 30px;
  }
`;

WithDrawInfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const CashExpressWithdraw = ({
  isOpen,
  handleClose,
  cash: { bank },
  onSubmit,
  isLoading,
  wallet,
}) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalContainer>
        <Grid container spacing={2}>
          <WithDrawInfoItem label="Banco">
            {`${bank.bank.code} - ${bank.bank.name}`}
          </WithDrawInfoItem>
          <WithDrawInfoItem label="Número da agência">
            {bank.agency}
          </WithDrawInfoItem>
          <WithDrawInfoItem label="Dígito da agência">
            {bank.agency_check}
          </WithDrawInfoItem>
          <WithDrawInfoItem label="Número da conta">
            {bank.account}
          </WithDrawInfoItem>
          <WithDrawInfoItem label="Dígito da conta">
            {bank.account_check}
          </WithDrawInfoItem>
          <WithDrawInfoItem label="Tipo de conta">{bank.type}</WithDrawInfoItem>
          <WithDrawInfoItem label="Titular da conta">
            {bank.account_holder}
          </WithDrawInfoItem>
          <WithDrawInfoItem label="Tipo de conta">
            {bank.doc_type}
          </WithDrawInfoItem>
          <WithDrawInfoItem label="Número do documento">
            {bank.doc_number}
          </WithDrawInfoItem>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}
          validateOnBlur
          enableReinitialize
          render={({ values, errors }) => (
            <Form>
              <PaymentContainer container spacing={2}>
                <Grid sm={6} xs={12}>
                  <Typography style={{ color: 'green' }}>
                    Disponível: R$ {toPrice(wallet.cash.avaliable)}
                  </Typography>
                  <WithDrawInfoItemLabel style={{ marginBottom: 10 }}>
                    Deseja sacar qual valor para a conta?
                  </WithDrawInfoItemLabel>
                  <FastField
                    name="value"
                    label="Valor"
                    component={CustomCurrencyField}
                  />
                </Grid>
                <Grid sm={6} xs={12} style={{ paddingTop: 42 }}>
                  <FormButtons
                    handleBack={handleClose}
                    submitText="Sacar"
                    isLoading={isLoading}
                  />
                </Grid>
              </PaymentContainer>
            </Form>
          )}
        />
      </ModalContainer>
    </Modal>
  );
};

CashExpressWithdraw.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  cash: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  wallet: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CashExpressWithdraw;
