import React from 'react';
import { Grid } from '@material-ui/core';
import StatisticItem from 'components/StatisticItem';
import PropTypes from 'prop-types';
import { toPrice } from 'utils/converters';

const SaleInfo = ({ wallet, walletLoading }) => (
  <Grid
    justify="center"
    style={{ marginTop: 30, marginBottom: 30 }}
    spacing={2}
    container
  >
    {!walletLoading && wallet && wallet.cash && (
      <>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <StatisticItem
            icon="attach_money"
            title="Disponível"
            description={`R$ ${toPrice(wallet.cash.current)}`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <StatisticItem
            icon="compare_arrows"
            title="A Receber"
            description={`R$ ${toPrice(wallet.cash.future)}`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <StatisticItem
            icon="lock"
            title="Bloqueado"
            description={`R$ ${toPrice(wallet.cash.unavailable)}`}
          />
        </Grid>
      </>
    )}
  </Grid>
);

SaleInfo.propTypes = {
  wallet: PropTypes.oneOfType([PropTypes.object]).isRequired,
  walletLoading: PropTypes.bool.isRequired,
};

export default SaleInfo;
