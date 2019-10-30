import React from 'react';
import { Grid } from '@material-ui/core';
import StatisticItem from 'components/StatisticItem';
import PropTypes from 'prop-types';
import { toPrice } from 'utils/converters';

const SaleInfo = ({ reportOrder, reportOrderLoading }) => (
  <Grid
    justify="center"
    style={{ marginTop: 30, marginBottom: 30 }}
    spacing={2}
    container
  >
    {!reportOrderLoading && reportOrder && reportOrder.prices && (
      <>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatisticItem
            icon="credit_card"
            title="Cartão de Crédito"
            description={`R$ ${toPrice(reportOrder.prices.card)}`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatisticItem
            icon="aspect_ratio"
            title="Boleto"
            description={`R$ ${toPrice(reportOrder.prices.billet)}`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatisticItem
            icon="receipt"
            title="Boleto a Faturar"
            description={`R$ ${toPrice(reportOrder.prices.billet_approved)}`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatisticItem
            icon="attach_money"
            title="Outras Formas"
            description={`R$ ${toPrice(reportOrder.prices.price_other)}`}
          />
        </Grid>
      </>
    )}
  </Grid>
);

SaleInfo.propTypes = {
  reportOrder: PropTypes.oneOfType([PropTypes.object]).isRequired,
  reportOrderLoading: PropTypes.bool.isRequired,
};

export default SaleInfo;
