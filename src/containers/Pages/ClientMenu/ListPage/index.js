import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as UserCreators } from 'store/ducks/user';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import ClientTableHeader from 'components/Pages/ClientPage/ClientTableHeader';
import ClientActions from 'components/Pages/ClientPage/ClientActions';

import AlertDialog from 'components/AlertDialog';

const columns = ({ onDeleteRequest }) => [
  {
    title: 'Nome',
    field: 'name',
    sorting: false,
  },
  // {
  //   title: 'Perfil',
  //   field: 'profile',
  //   sorting: false,
  // },
  {
    title: 'E-mail',
    field: 'email',
    sorting: false,
  },
  {
    title: 'CPF/CNPJ',
    field: 'cpf',
    sorting: false,
  },
  {
    title: 'Telefone',
    field: 'cell_phone',
    sorting: false,
  },
  // {
  //   title: 'Cadastro',
  //   field: 'create_at',
  //   sorting: false,
  // },
  {
    title: 'Ações',
    render: rowData => (
      <ClientActions rowData={rowData} onDeleteRequest={onDeleteRequest} />
    ),
  },
];

const ClientListPage = () => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState({
    search: '',
    orderByColumn: '',
    orderByDirection: '',
    page: 1,
    perPage: 10,
    group_id: 5,
  });

  const [deleteState, setDeleteState] = React.useState({
    open: false,
    item: {},
  });

  const { userList, userListTotal, userDeleteLoading } = useSelector(
    state => state.user,
  );

  React.useEffect(() => {
    dispatch(UserCreators.getUserListRequest(localState));
  }, []);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(UserCreators.getUserListRequest(localState));
  }, [localState]);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(UserCreators.getUserDeleteRequest(deleteState.item.id));
  };

  React.useEffect(() => {
    if (userDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [userDeleteLoading]);

  return (
    <PageBase>
      <HeaderComponent title="Listar Clientes">
        <ClientTableHeader
          getFunction={getFunction}
          initialValues={{ search: localState.search }}
        />
      </HeaderComponent>
      <Paper>
        <DefaultTable
          getFunction={getFunction}
          columns={columns({ onDeleteRequest })}
          data={userList}
          total={userListTotal}
          isLoading={false}
          page={localState.page}
          perPage={localState.perPage}
        />
      </Paper>
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={userDeleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro de cliente?"
        description={`Remover Cliente: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default ClientListPage;
