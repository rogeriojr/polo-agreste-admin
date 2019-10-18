import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as StoreCreators } from 'store/ducks/stores';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import StoreTableHeader from 'components/Pages/StorePage/StoreTableHeader';
import StoreActions from 'components/Pages/StorePage/StoreActions';
import StoreStatus from 'components/Pages/StorePage/StoreStatus';
import StoreFooter from 'components/Pages/StorePage/StoreFooter';
import AlertDialog from 'components/AlertDialog';
import StoreImage from 'components/Pages/StorePage/StoreImage';
import StoreWirecardStatus from 'components/Pages/StorePage/StoreWirecardStatus';

const columns = ({ onDeleteRequest }) => [
  {
    title: 'Referência',
    field: 'id',
    sorting: false,
  },
  {
    title: 'Imagem',
    field: 'image',
    sorting: false,
    render: rowData => <StoreImage rowData={rowData} />
  },
  {
    title: 'Nome',
    field: 'name',
    sorting: false,
  },
  {
    title: 'CNPJ',
    field: 'cnpj',
    sorting: false,
  },
  {
    title: 'Telefone',
    field: 'cell_phone',
    sorting: false,
  },
  {
    title: 'Wirecard',
    field: 'wirecard_id',
    sorting: false,
    render: rowData => <StoreWirecardStatus rowData={rowData} />,
  },
  {
    title: 'Status',
    sorting: false,
    render: rowData => <StoreStatus rowData={rowData} />,
  },
  {
    title: 'Ações',
    render: rowData => (
      <StoreActions rowData={rowData} onDeleteRequest={onDeleteRequest} />
    ),
  },
];

const StoreListPage = () => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState({
    search: '',
    orderByColumn: '',
    orderByDirection: '',
    page: 1,
    perPage: 10,
  });

  const [deleteState, setDeleteState] = React.useState({
    open: false,
    item: {},
  });

  const {
    storeList,
    storeListLoading,
    storeListTotal,
    storeDeleteLoading,
  } = useSelector(state => state.store);

  React.useEffect(() => {
    dispatch(StoreCreators.getStoreListRequest(localState));
  }, []);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(StoreCreators.getStoreListRequest(localState));
  }, [localState]);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(StoreCreators.getStoreDeleteRequest(deleteState.item.id));
  };

  React.useEffect(() => {
    if (storeDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [storeDeleteLoading]);

  return (
    <PageBase>
      <HeaderComponent title="Listar Lojas">
        <StoreTableHeader
          getFunction={getFunction}
          initialValues={{ search: localState.search }}
        />
      </HeaderComponent>
      <Paper>
        <DefaultTable
          getFunction={getFunction}
          columns={columns({ onDeleteRequest })}
          data={storeList}
          total={storeListTotal}
          isLoading={storeListLoading}
          page={localState.page}
          perPage={localState.perPage}
          footer={<StoreFooter />}
        />
      </Paper>
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={storeDeleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Remover loja: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default StoreListPage;
