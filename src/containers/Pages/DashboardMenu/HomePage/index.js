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
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as DashboardCreators } from 'store/ducks/dashboard';
import { toPrice } from 'utils/converters';

const ChartContainer = styled('div')`
  @media (max-width: 680px) {
    overflow-x: scroll;
    width: calc(100vw - 60px);
    position: relative;
  }
`;

const DashboardPage = () => {
  const graphicData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];
  
  const dispatch = useDispatch()

  const { dashboard, dashboardLoading } = useSelector(state => state.dashboard);

  const today = moment();
  const actualDate = moment();
  const weekdate = today.add(-7, 'day');

  const [localState, setLocalState] = React.useState({
    dateStart: weekdate.format('YYYY-MM-DD'),
    dateEnd: actualDate.format('YYYY-MM-DD'),
  });

  React.useEffect(() => {
    dispatch(DashboardCreators.getDashboardRequest(localState));
  }, []);

  React.useEffect(() => {
    dispatch(DashboardCreators.getDashboardRequest(localState));
  }, [localState]);

  const onSubmit = data => {
    setLocalState({
      ...localState,
      ...data,
    });
  };

  // const { changeStartDate, changeEndDate } = this;
  return (
    <PageBase>
      <PageHeader title="Dashboard">
        <DatePickerForm
          onSubmit={onSubmit}
          initialValues={{
            dateStart: weekdate,
            dateEnd: actualDate,
          }}
        />
      </PageHeader>
      {!dashboardLoading && (
        <Grid justify="center" style={{ marginTop: 30 }} spacing={2} container>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <StatisticItem
              icon="attach_money"
              title="Faturamento"
              description={`R$ ${toPrice(dashboard.billing)}`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <StatisticItem
              icon="receipt"
              title="Aguardando Pagamento"
              description={`R$ ${toPrice(dashboard.awaiting_payment)}`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <StatisticItem
              icon="signal_cellular_alt"
              title="Valor Médio da Venda"
              description={`R$ ${toPrice(dashboard.average_ticket)}`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <StatisticItem
              icon="person_add"
              title="Cadastros"
              description={dashboard.registrations_made}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <StatisticItem
              icon="style"
              title="Produtos Vendidos"
              description={dashboard.sold_products}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <StatisticItem
              icon="trending_up"
              title="Quantidade de vendas"
              description={dashboard.sales_quantity}
            />
          </Grid>
        </Grid>
      )}
      {/*
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
                data={graphicData}
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
      */}
    </PageBase>
  );
};

export default DashboardPage;
