import React from 'react';
import PageBase from 'components/PageBase';
import HeaderComponent from 'components/HeaderComponent';
import ListProfileClientTableHeader from 'components/Pages/ClientPage/CustomTableHeader';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CategoryCreators } from 'store/ducks/category';
import AlertDialog from 'components/AlertDialog';
import ListaProfileClientActions from 'components/Pages/ClientPage/ListaProfileClientActions';

const columns = ({ onDeleteRequest }) => [
  {
    title: 'Nome',
    field: 'name',
    sorting: false,
  },
  {
    title: 'Perfil',
    field: 'profile_content',
    sorting: false,
  },
  {
    title: 'Plano',
    field: 'plan',
    sorting: false,
  },
  {
    title: 'Cadastro',
    field: 'register',
    sorting: false,
  },
  {
    title: 'Modificado',
    field: 'modified',
    sorting: false,
  },
  {
    title: 'Ações',
    render: rowData => (
      <ListaProfileClientActions
        rowData={rowData}
        onDeleteRequest={onDeleteRequest}
      />
    ),
  },
];

const ClientProfileListPage = () => {
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
  // criar rota no saga para cliente, não usar category
  const {
    categoryList,
    categoryListLoading,
    categoryListTotal,
    categoryDeleteLoading,
  } = useSelector(state => state.category);

  React.useEffect(() => {
    dispatch(CategoryCreators.getCategoryListRequest(localState));
  }, []);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  React.useEffect(() => {
    if (categoryDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [categoryDeleteLoading]);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(CategoryCreators.getCategoryListRequest(localState));
  }, [localState]);

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(CategoryCreators.getCategoryDeleteRequest(deleteState.item.id));
  };

  return (
    <PageBase>
      <HeaderComponent title="Listar Perfis de Cliente">
        <ListProfileClientTableHeader
          getFunction={getFunction}
          initialValues={{ search: localState.search }}
        />
      </HeaderComponent>
      <DefaultTable
        getFunction={getFunction}
        columns={columns({ onDeleteRequest })}
        data={categoryList}
        total={categoryListTotal}
        isLoading={categoryListLoading}
        page={localState.page}
        perPage={localState.perPage}
      />
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={categoryDeleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Remover cliente: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default ClientProfileListPage;
