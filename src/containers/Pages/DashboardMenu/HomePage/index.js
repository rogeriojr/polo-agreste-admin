import React from 'react';
import PageBase from 'components/PageBase';
import PageHeader from 'components/PageHeader';
import {
  Grid,
  Typography,
  Paper,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  MenuItem,
} from '@material-ui/core';
import StatisticItem from 'components/StatisticItem';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Select from 'components/Select';
import DatePickerForm from 'components/Pages/DashboardPage/DatePickerForm';
import styled from 'styled-components';

const ChartContainer = styled('div')`
  @media (max-width: 680px) {
    overflow-x: scroll;
    width: calc(100vw - 60px);
    position: relative;
  }
`;


const DashboardPage = () => {
  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  const onSubmit = dados => {
    console.log(dados);
  };

  // const { changeStartDate, changeEndDate } = this;
  return (
    <PageBase>
      <PageHeader title="Dashboard">
        <DatePickerForm onSubmit={onSubmit} />
      </PageHeader>
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
            icon="attach_money"
            title="Faturamento"
            description="R$ 0,00"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatisticItem
            icon="receipt"
            title="Aguardando Pagamento"
            description="R$ 0,00"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatisticItem
            icon="signal_cellular_alt"
            title="Ticket Médio"
            description="R$ 0,00"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatisticItem
            icon="remove_red_eye"
            title="Page Views"
            description="0000"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatisticItem
            icon="attach_money"
            title="Conversão"
            description="0%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatisticItem icon="person_add" title="Cadastros" description="0" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatisticItem
            icon="attach_money"
            title="Produtos Vendidos"
            description="0"
          />
        </Grid>
      </Grid>
      <Paper className="paper-custom" style={{ marginTop: 30 }}>
        <Grid container justify="center" spacing={2}>
          <Grid item md={4}>
            <Typography variant="h6" style={{ marginTop: 8 }}>
              Faturamento
            </Typography>
          </Grid>
          <Grid item md={4}>
            <FormControl component="fieldset">
              <RadioGroup
                name="filtering1"
                value="filter1"
                style={{ flexDirection: 'row' }}
              >
                <FormControlLabel
                  value="filter1"
                  control={<Radio />}
                  label="Filtro 1"
                />
                <FormControlLabel
                  value="filter2"
                  control={<Radio />}
                  label="Filtro 2"
                />
                <FormControlLabel
                  value="filter3"
                  control={<Radio />}
                  label="Filtro 3"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <FormControl
              component="fieldset"
              style={{ display: 'block', textAlign: 'right' }}
            >
              <FormLabel style={{ fontSize: 12, marginRight: 10 }}>
                Visualização
              </FormLabel>
              <Select value="sel" style={{ marginTop: 0 }}>
                <MenuItem value="sel">
                  <em>(Selecione)</em>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <ChartContainer>
              <LineChart
                data={data}
                width={600}
                height={300}
                margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ChartContainer>
          </Grid>
        </Grid>
      </Paper>
    </PageBase>
  );
};

export default DashboardPage;
