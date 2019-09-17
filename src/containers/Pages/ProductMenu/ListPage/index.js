import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProductCreators } from 'store/ducks/product';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import ProductTableHeader from 'components/Pages/ProductPage/ProductTableHeader';
import ProductActions from 'components/Pages/ProductPage/ProductActions';
import { toPrice } from 'utils/converters';
import ProductStatus from 'components/Pages/ProductPage/ProductStatus';
import ProductFooter from 'components/Pages/ProductPage/ProductFooter';
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
    title: 'Tipo',
    field: 'type',
    sorting: false,
  },
  {
    title: 'Preço',
    field: 'price',
    sorting: false,
    render: rowData => <span>R$ {toPrice(rowData.price)}</span>,
  },
  {
    title: 'Atualizado',
    field: 'update_at',
    sorting: false,
  },
  {
    title: 'Loja',
    field: 'store.name',
    sorting: false,
  },
  {
    title: 'Status',
    sorting: false,
    render: rowData => <ProductStatus rowData={rowData} />,
  },
  {
    title: 'Ações',
    render: rowData => (
      <ProductActions rowData={rowData} onDeleteRequest={onDeleteRequest} />
    ),
  },
];

const ProductListPage = () => {
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
    productList,
    productListLoading,
    productListTotal,
    productDeleteLoading,
  } = useSelector(state => state.product);

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
      <HeaderComponent title="Listar Produtos">
        <ProductTableHeader
          getFunction={getFunction}
          initialValues={{ search: localState.search }}
        />
      </HeaderComponent>
      <Paper>
        <DefaultTable
          getFunction={getFunction}
          columns={columns({ onDeleteRequest })}
          data={productList}
          total={productListTotal}
          isLoading={productListLoading}
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
        title="Excluir registro?"
        description={`Remover produto: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default ProductListPage;
