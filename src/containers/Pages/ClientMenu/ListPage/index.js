import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProductCreators } from 'store/ducks/product';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import ClientTableHeader from 'components/Pages/ClientPage/ClientTableHeader';
import ClientActions from 'components/Pages/ClientPage/ClientActions';

import ProductFooter from 'components/Pages/ProductPage/ProductFooter';
import AlertDialog from 'components/AlertDialog';

const columns = ({ onDeleteRequest }) => [
  {
    title: 'Nome',
    field: 'orderId',
    sorting: false,
  },
  {
    title: 'Perfil',
    field: 'name',
    sorting: false,
  },
  {
    title: 'E-mail',
    field: 'type',
    sorting: false,
  },
  {
    title: 'CPF/CNPJ',
    field: 'create_at',
    sorting: false,
  },
  {
    title: 'Telefone',
    field: 'update_at',
    sorting: false,
  },
  {
    title: 'Cadastro',
    field: 'create_at',
    sorting: false,
  },
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
  });

  const [deleteState, setDeleteState] = React.useState({
    open: false,
    item: {},
  });

  const { productListTotal, productDeleteLoading } = useSelector(
    state => state.product,
  );

  React.useEffect(() => {
    dispatch(ProductCreators.getProductListRequest(localState));
  }, []);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(ProductCreators.getProductListRequest(localState));
  }, [localState]);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(ProductCreators.getProductDeleteRequest(deleteState.item.id));
  };

  React.useEffect(() => {
    if (productDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [productDeleteLoading]);

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
          data={[
            {
              orderId: 'murillo',
              name: 'Consumidor',
              type: 'exemplo@email.com',
              create_at: '123.456.789-01324',
              update_at: '(01) 3123-4567',
            },
            {
              orderId: 'ana',
              name: 'cliente Teste',
              type: 'Descrição@status',
              create_at: '12424324',
              update_at: '28/08/2019',
              actions: 1,
            },
          ]}
          total={productListTotal}
          isLoading={false}
          page={localState.page}
          perPage={localState.perPage}
          footer={<ProductFooter />}
        />
      </Paper>
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={productDeleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro de cliente?"
        description={`Remover Cliente: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default ClientListPage;
