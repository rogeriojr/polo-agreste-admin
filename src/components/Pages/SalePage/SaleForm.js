import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProductCreators } from 'store/ducks/product';
import { Paper } from '@material-ui/core';

// import ProductFooter from 'components/Pages/ProductPage/ProductFooter';
import AlertDialog from 'components/AlertDialog';

const columns = () => [
  {
    title: 'Data',
    field: 'orderId',
    sorting: false,
  },
  {
    title: 'Pedido',
    field: 'name',
    sorting: false,
  },
  {
    title: 'Cliente',
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
    title: 'Pagamento',
    field: 'create_at',
    sorting: false,
  },
  {
    title: 'Pagamento Aprovado',
    field: 'create_at',
    sorting: false,
  },
];

const SaleForm = () => {
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
      <Paper style={{ marginTop: 40 }}>
        <DefaultTable
          getFunction={getFunction}
          isLoading={false}
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
          // isLoading={productListLoading}
          page={localState.page}
          perPage={localState.perPage}
          // footer={<ProductFooter />}
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

export default SaleForm;
