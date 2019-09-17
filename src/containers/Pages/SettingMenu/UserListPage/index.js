import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as UserCreators } from 'store/ducks/user';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import UserTableHeader from 'components/Pages/UserPage/UserTableHeader';
import UserActions from 'components/Pages/UserPage/UserActions';
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
    title: 'E-mail',
    field: 'email',
    sorting: false,
  },
  {
    title: 'Loja',
    field: 'store.name',
    sorting: false,
  },
  {
    title: 'Grupo',
    field: 'group.name',
    sorting: false,
  },
  {
    title: 'Ações',
    render: rowData => (
      <UserActions rowData={rowData} onDeleteRequest={onDeleteRequest} />
    ),
  },
];

const UserListPage = () => {
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
    userList,
    userListLoading,
    userListTotal,
    userDeleteLoading,
  } = useSelector(state => state.user);

  React.useEffect(() => {
    dispatch(UserCreators.getUserListRequest(localState));
  }, []);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  React.useEffect(() => {
    if (userDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [userDeleteLoading]);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(UserCreators.getUserListRequest(localState));
  }, [localState]);

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(UserCreators.getUserDeleteRequest(deleteState.item.id));
  };

  return (
    <PageBase>
      <HeaderComponent title="Listar Usuários">
        <UserTableHeader
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
          isLoading={userListLoading}
          page={localState.page}
          perPage={localState.perPage}
        />
      </Paper>
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={userDeleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Remover categoria: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default UserListPage;
