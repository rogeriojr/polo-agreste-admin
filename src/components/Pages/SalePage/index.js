import React from 'react';
import PageBase from 'components/PageBase';
import { Grid } from '@material-ui/core';
import StatisticItem from 'components/StatisticItem';
import SaleForm from 'components/Pages/SalePage/SaleForm';

const SalePage = () => (
  <PageBase>
    <Grid justify="center" style={{ marginTop: 30 }} spacing={2} container>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <StatisticItem
          icon="credit_card"
          title="Cartão de Crédito"
          description="R$ 0,00"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <StatisticItem
          icon="aspect_ratio"
          title="Boleto"
          description="R$ 0,00"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <StatisticItem
          icon="receipt"
          title="Boleto a Faturar"
          description="R$ 0,00"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <StatisticItem
          icon="attach_money"
          title="Outras Formas"
          description="R$ 0,00"
        />
      </Grid>
    </Grid>
    <SaleForm />
  </PageBase>
);

export default SalePage;
