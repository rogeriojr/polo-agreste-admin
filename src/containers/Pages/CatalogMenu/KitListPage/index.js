import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as KitCreators } from 'store/ducks/kit';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import KitTableHeader from 'components/Pages/KitPage/KitTableHeader';
import KitActions from 'components/Pages/KitPage/KitActions';
import { toPrice } from 'utils/converters';
import KitStatus from 'components/Pages/KitPage/KitStatus';
import KitFooter from 'components/Pages/KitPage/KitFooter';
import AlertDialog from 'components/AlertDialog';
import KitImage from 'components/Pages/KitPage/KitImage';

const columns = ({ onDeleteRequest }) => [
  {
    title: 'Referência',
    field: 'id',
    sorting: false,
  },
  {
    title: 'Imagem',
    field: 'images',
    sorting: false,
    render: rowData => <KitImage rowData={rowData} />,
  },
  {
    title: 'Nome',
    field: 'name',
    sorting: false,
  },
  {
    title: 'Status',
    sorting: false,
    render: rowData => <KitStatus rowData={rowData} />,
  },
  {
    title: 'Ações',
    render: rowData => (
      <KitActions rowData={rowData} onDeleteRequest={onDeleteRequest} />
    ),
  },
];

const KitListPage = () => {
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
    kitList,
    kitListLoading,
    kitListTotal,
    kitDeleteLoading,
  } = useSelector(state => state.kit);

  React.useEffect(() => {
    dispatch(KitCreators.getKitListRequest(localState));
  }, []);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(KitCreators.getKitListRequest(localState));
  }, [localState]);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(KitCreators.getKitDeleteRequest(deleteState.item.id));
  };

  React.useEffect(() => {
    if (kitDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [kitDeleteLoading]);

  return (
    <PageBase>
      <HeaderComponent title="Listar Kit">
        <KitTableHeader
          getFunction={getFunction}
          initialValues={{ search: localState.search }}
        />
      </HeaderComponent>
      <Paper>
        <DefaultTable
          getFunction={getFunction}
          columns={columns({ onDeleteRequest })}
          data={kitList}
          total={kitListTotal}
          isLoading={kitListLoading}
          page={localState.page}
          perPage={localState.perPage}
          footer={<KitFooter />}
        />
      </Paper>
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={kitDeleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Remover produto: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default KitListPage;
