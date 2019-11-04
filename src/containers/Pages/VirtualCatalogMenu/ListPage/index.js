import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as VirtualCatalogCreators } from 'store/ducks/virtualCatalog';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import VirtualCatalogTableHeader from 'components/Pages/VirtualCatalogPage/VirtualCatalogTableHeader';
import VirtualCatalogActions from 'components/Pages/VirtualCatalogPage/VirtualCatalogActions';
import AlertDialog from 'components/AlertDialog';
import VirtualCatalogImage from 'components/Pages/VirtualCatalogPage/VirtualCatalogImage';

const columns = ({ onDeleteRequest }) => [
  {
    title: 'Referência',
    field: 'id',
    sorting: false,
  },
  {
    title: 'Capa',
    field: 'image',
    sorting: false,
    render: rowData => <VirtualCatalogImage rowData={rowData} />,
  },
  {
    title: 'Nome',
    field: 'name',
    sorting: false,
  },
  {
    title: 'Ações',
    render: rowData => (
      <VirtualCatalogActions
        rowData={rowData}
        onDeleteRequest={onDeleteRequest}
      />
    ),
  },
];

const VirtualCatalogListPage = () => {
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
  });

  const {
    virtualCatalogList,
    virtualCatalogListLoading,
    virtualCatalogListTotal,
    virtualCatalogDeleteLoading,
  } = useSelector(state => state.virtualCatalog);

  React.useEffect(() => {
    dispatch(VirtualCatalogCreators.getVirtualCatalogListRequest(localState));
  }, []);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  React.useEffect(() => {
    if (virtualCatalogDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [virtualCatalogDeleteLoading]);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(VirtualCatalogCreators.getVirtualCatalogListRequest(localState));
  }, [localState]);

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(
      VirtualCatalogCreators.getVirtualCatalogDeleteRequest(
        deleteState.item.id,
      ),
    );
  };

  return (
    <PageBase>
      <HeaderComponent title="Listar Catálogo Virtual">
        <VirtualCatalogTableHeader
          getFunction={getFunction}
          initialValues={{ search: localState.search }}
        />
      </HeaderComponent>
      <Paper>
        <DefaultTable
          getFunction={getFunction}
          columns={columns({ onDeleteRequest })}
          data={virtualCatalogList}
          total={virtualCatalogListTotal}
          isLoading={virtualCatalogListLoading}
          page={localState.page}
          perPage={localState.perPage}
        />
      </Paper>
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={virtualCatalogDeleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Remover categoria: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default VirtualCatalogListPage;
