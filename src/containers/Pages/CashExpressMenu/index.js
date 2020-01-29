import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as OrderCreators } from 'store/ducks/order';
import { Creators as WalletCreators } from 'store/ducks/wallet';
import HeaderComponent from 'components/HeaderComponent';
import OrderTableHeader from 'components/Pages/OrderPage/OrderTableHeader';
import { Paper } from '@material-ui/core';
import AlertDialog from 'components/AlertDialog';
import OrderActions from 'components/Pages/OrderPage/OrderActions';
import { InputItem, InputContainer } from 'components/form/StyledComponents';
import CustomSelect from 'components/form/components/CustomSelect';
import { formatStoresName, formatDate2, formatStatus } from 'utils/converters';
import OrderPaymentType from 'components/Pages/OrderPage/OrderPaymentType';
import CashExpressInfo from 'components/Pages/CashExpressPage/CashExpressInfo';

const CashExpressPage = () => {
  const columns = ({ onDeleteRequest }) => [
    { title: 'Pedido', field: 'id', type: 'numeric' },
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
    },
    {
      title: 'Pagamento',
      field: 'payment_type',
      render: rowData => <OrderPaymentType rowData={rowData} />,
    },
    {
      title: 'Realizado',
      field: 'created_at',
      render: rowData => <span>{formatDate2(rowData.created_at)}</span>,
    },
    {
      title: 'Atualizado',
      field: 'updated_at',
      render: rowData => <span>{formatDate2(rowData.updated_at)}</span>,
    },
  ];

  const dispatch = useDispatch();
  const [deleteState, setDeleteState] = React.useState({
    open: false,
    item: {},
  });

  const [localState, setLocalState] = React.useState({
    search: '',
    orderByColumn: '',
    orderByDirection: '',
    page: 1,
    perPage: 10,
    dateStart: '',
    dateEnd: '',
  });

  const {
    orderList,
    orderListLoading,
    orderListTotal,
    orderDeleteLoading,
  } = useSelector(state => state.order);

  const { wallet, walletLoading } = useSelector(
    state => state.wallet,
  );

  React.useEffect(() => {
    dispatch(OrderCreators.getOrderListRequest(localState));
    dispatch(WalletCreators.getWalletRequest(localState));
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
    dispatch(WalletCreators.getWalletRequest(localState));
  }, [localState]);

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(OrderCreators.getOrderDeleteRequest(deleteState.item.id));
    dispatch(WalletCreators.getWalletRequest(localState));
  };

  return (
    <PageBase>
      <HeaderComponent title="Cash Express" />
      <CashExpressInfo wallet={wallet} walletLoading={walletLoading} />
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
        description={`Remover pedido: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default CashExpressPage;
