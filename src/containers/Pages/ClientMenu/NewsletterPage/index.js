import React from 'react';
import PageBase from 'components/PageBase';
import AlertDialog from 'components/AlertDialog';
import TableHeader from 'components/Pages/NewsletterPage/TableHeader';
import HeaderComponent from 'components/HeaderComponent';
import DefaultTable from 'components/Tables/DefaultTable';
import { Paper } from '@material-ui/core';
import Actions from 'components/Pages/NewsletterPage/Actions';

const columns = ({ onDeleteRequest }) => [
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
    title: 'Perfil do Cliente',
    field: 'customer_profile',
    sorting: false,
  },
  {
    title: 'Atualizado',
    field: 'update',
    sorting: false,
  },
  {
    title: 'Status',
    field: 'status',
    // render: rowData => <ClientStatus rowData={rowData} />,
  },
  {
    title: 'Ações',
    field: 'actions',
    render: rowData => (
      <Actions rowData={rowData} onDeleteRequest={onDeleteRequest} />
    ),
  },
];

const dataMock = [
  {
    orderId: 1,
    name: 'teste Nome',
    email: 'exemplo@email.com',
    customer_profile: 'Conteúdo Cliente',
    update: '02/01/2019 16:01',
    status: 1,
  },
  {
    orderId: 1,
    name: 'Conteúdo Nome',
    email: 'exemplo@email.com',
    customer_profile: 'Conteúdo Cliente',
    update: '02/01/2019 16:01',
    status: 0,
  },
  {
    orderId: 1,
    name: 'Conteúdo Nome',
    email: 'exemplo@email.com',
    customer_profile: 'Conteúdo Cliente',
    update: '02/01/2019 16:01',
    status: 0,
  },
];

const NewsletterPage = () => {
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

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  React.useEffect(() => {
    if (deleteState.open) {
      handleAlertDialogClose();
    }
  });
  return (
    <PageBase>
      <HeaderComponent title="Newsletter">
        <TableHeader
          getFunction={getFunction}
          initialValues={{ search: localState.search }}
        />
      </HeaderComponent>
      <Paper>
        <DefaultTable
          getFunction={getFunction}
          columns={columns({ onDeleteRequest })}
          data={dataMock}
          total={dataMock.length}
          isLoading={false}
          page={localState.page}
          perPage={localState.perPage}
        />
      </Paper>
      <AlertDialog
        onConfirm={() => {}}
        isOpen={deleteState.open}
        handleClose={handleAlertDialogClose}
        title="Excluir registro?"
        description={`Remover newsletter: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default NewsletterPage;
