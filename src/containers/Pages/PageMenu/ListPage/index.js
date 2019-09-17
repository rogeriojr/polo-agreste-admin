import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as PageCreators } from 'store/ducks/page';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import PageTableHeader from 'components/Pages/PageComponents/PageTableHeader';
import PageActions from 'components/Pages/PageComponents/PageActions';
import AlertDialog from 'components/AlertDialog';

const columns = ({ onDeleteRequest }) => [
  {
    title: 'Referência',
    field: 'id',
    sorting: false,
  },
  {
    title: 'Nome',
    field: 'name',
    sorting: false,
  },
  {
    title: 'Slug',
    field: 'slug',
    sorting: false,
  },
  {
    title: 'Data da notícia',
    field: 'created_at',
    sorting: false,
  },
  {
    title: 'Atualizada',
    field: 'update_at',
    sorting: false,
  },
  {
    title: 'Ações',
    render: rowData => (
      <PageActions rowData={rowData} onDeleteRequest={onDeleteRequest} />
    ),
  },
];

const PageListPage = () => {
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
    pageList,
    pageListLoading,
    pageListTotal,
    pageDeleteLoading,
  } = useSelector(state => state.page);

  React.useEffect(() => {
    dispatch(PageCreators.getPageListRequest(localState));
  }, []);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  React.useEffect(() => {
    if (pageDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [pageDeleteLoading]);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(PageCreators.getPageListRequest(localState));
  }, [localState]);

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(PageCreators.getPageDeleteRequest(deleteState.item.id));
  };

  return (
    <PageBase>
      <HeaderComponent title="Listar Página">
        <PageTableHeader
          getFunction={getFunction}
          initialValues={{ search: localState.search }}
        />
      </HeaderComponent>
      <Paper>
        <DefaultTable
          getFunction={getFunction}
          columns={columns({ onDeleteRequest })}
          data={pageList}
          total={pageListTotal}
          isLoading={pageListLoading}
          page={localState.page}
          perPage={localState.perPage}
        />
      </Paper>
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={pageDeleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Remover página: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default PageListPage;
