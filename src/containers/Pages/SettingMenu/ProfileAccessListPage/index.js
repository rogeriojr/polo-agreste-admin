import React from 'react';
import PageBase from 'components/PageBase';
import HeaderComponent from 'components/HeaderComponent';
import ListProfileAccessTableHeader from 'components/Pages/ProfileAccessListPage/CustomTableHeader';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProfileAccessCreators } from 'store/ducks/profileAccess';
import AlertDialog from 'components/AlertDialog';
import ProfileAccessListPageActions from 'components/Pages/ProfileAccessListPage/ProfileAccessListPageActions';

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
      <ProfileAccessListPageActions
        rowData={rowData}
        onDeleteRequest={onDeleteRequest}
      />
    ),
  },
];

const ProfileAccessListPage = () => {
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
    profileAccessList,
    profileAccessListLoading,
    profileAccessListTotal,
    profileAccessDeleteLoading,
  } = useSelector(state => state.profileAccess);

  React.useEffect(() => {
    dispatch(ProfileAccessCreators.getProfileAccessListRequest(localState));
  }, []);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  React.useEffect(() => {
    if (profileAccessDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [profileAccessDeleteLoading]);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(ProfileAccessCreators.getProfileAccessListRequest(localState));
  }, [localState]);

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(
      ProfileAccessCreators.getProfileAccessDeleteRequest(deleteState.item.id),
    );
  };

  return (
    <PageBase>
      <HeaderComponent title="Listar Perfil de Acesso">
        <ListProfileAccessTableHeader
          getFunction={getFunction}
          initialValues={{ search: localState.search }}
        />
      </HeaderComponent>
      <DefaultTable
        getFunction={getFunction}
        columns={columns({ onDeleteRequest })}
        data={profileAccessList}
        total={profileAccessListTotal}
        isLoading={profileAccessListLoading}
        page={localState.page}
        perPage={localState.perPage}
      />
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={profileAccessDeleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Remover cliente: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default ProfileAccessListPage;
