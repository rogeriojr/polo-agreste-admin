import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as OrderCreators } from 'store/ducks/order';
import HeaderComponent from 'components/HeaderComponent';
import OrderTableHeader from 'components/Pages/OrderPage/OrderTableHeader';
import { Paper } from '@material-ui/core';
import AlertDialog from 'components/AlertDialog';
import OrderActions from 'components/Pages/OrderPage/OrderActions';
import { InputItem, InputContainer } from 'components/form/StyledComponents';
import CustomSelect from 'components/form/components/CustomSelect';
import { formatPaymentType, formatStoresName, formatDate, formatStatus, toPrice } from 'utils/converters';
import { Link } from 'react-router-dom';
import OrderPaymentType from 'components/Pages/OrderPage/OrderPaymentType';
import moment from 'moment';

const OrderListPage = () => {
  const [storesState, setStoresState] = React.useState({
    list: [
      { name: 'Aprovado/Pago', id: 0 },
      { name: 'Não autorizado/Não pago', id: 1 },
    ],
    selectedStore: 1,
    isLoading: false,
  });

  const onChange = newValue => {
    setStoresState(oldState => ({ ...oldState, selectedStore: newValue }));
  };

  const replaceSelect = {
    setFieldValue: (event, newValue) => {
      onChange(newValue);
    },
  };

  const { list, isLoading, selectedStore } = storesState;

  const columns = ({ onDeleteRequest }) => [
    {
      title: 'Pedido',
      field: 'id',
      render: rowData => (
        <span>
          <Link style={{ color: '#000' }} to={`/orders/view/${rowData.id}`}>
            {rowData.id}
          </Link>
        </span>
      ),
    },
    {
      title: 'Loja',
      field: 'stores',
      render: rowData => (
        <span style={{ whiteSpace: 'pre' }}>
          {formatStoresName(rowData.stores)}
        </span>
      ),
    },
    { title: 'Cliente', field: 'user.name' },
    { title: 'CPF/CNPJ', field: 'user.cpf' },
    {
      title: 'Status',
      field: 'status',
      render: rowData => <span>{formatStatus(rowData.status)}</span>,
      /*
      render: rowData => (
        <InputContainer>
          <InputItem>
            <CustomSelect
              name="store_select"
              label="Selecione"
              field={{ value: selectedStore }}
              options={list}
              component={CustomSelect}
              placeholder="Selecione"
              isLoading={isLoading}
              form={replaceSelect}
            />
          </InputItem>
        </InputContainer>
      ),
      */
    },
    {
      title: 'Pagamento',
      field: 'payment_type',
      render: rowData => <OrderPaymentType rowData={rowData} />,
    },
    {
      title: 'Preço',
      field: 'payment_type',
      render: rowData => <span>R$ {toPrice(rowData.price)}</span>,
    },
    {
      title: 'Realizado',
      field: 'created_at',
      render: rowData => <span>{formatDate(rowData.created_at)}</span>,
    },
    {
      title: 'Atualizado',
      field: 'updated_at',
      render: rowData => <span>{formatDate(rowData.updated_at)}</span>,
    },
    {
      title: 'Ações',
      field: 'actions',
      render: rowData => (
        <OrderActions rowData={rowData} onDeleteRequest={onDeleteRequest} />
      ),
    },
  ];

  const dispatch = useDispatch();
  const [deleteState, setDeleteState] = React.useState({
    open: false,
    item: {},
  });

  const today = moment();
  const actualDate = moment();
  const weekdate = today.add(-7, 'day');

  const [localState, setLocalState] = React.useState({
    search: '',
    orderByColumn: '',
    orderByDirection: '',
    page: 1,
    perPage: 10,
    dateStart: weekdate.format('YYYY-MM-DD'),
    dateEnd: actualDate.format('YYYY-MM-DD'),
  });

  const {
    orderList,
    orderListLoading,
    orderListTotal,
    orderDeleteLoading,
  } = useSelector(state => state.order);

  React.useEffect(() => {
    dispatch(OrderCreators.getOrderListRequest(localState));
  }, []);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  React.useEffect(() => {
    if (orderDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [orderDeleteLoading]);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(OrderCreators.getOrderListRequest(localState));
  }, [localState]);

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(OrderCreators.getOrderDeleteRequest(deleteState.item.id));
  };

  return (
    <PageBase>
      <HeaderComponent title="Listar Pedidos">
        <OrderTableHeader
          getFunction={getFunction}
          initialValues={{
            search: localState.search,
            dateStart: weekdate,
            dateEnd: actualDate,
          }}
        />
      </HeaderComponent>
      <Paper>
        <DefaultTable
          getFunction={getFunction}
          columns={columns({ onDeleteRequest })}
          data={orderList}
          total={orderListTotal}
          isLoading={orderListLoading}
          page={localState.page}
          perPage={localState.perPage}
        />
      </Paper>
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={orderListLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Remover categoria: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default OrderListPage;
