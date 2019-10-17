import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as SizeCreators } from 'store/ducks/productSize';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import SizeTableHeader from 'components/Pages/SizePage/SizeTableHeader';
import SizeActions from 'components/Pages/SizePage/SizeActions';
import AlertDialog from 'components/AlertDialog';
import SizeStatus from 'components/Pages/SizePage/SizeStatus';
import SizeFooter from 'components/Pages/SizePage/SizeFooter';

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
    title: 'Status',
    field: 'status',
    sorting: false,
    render: rowData => <SizeStatus rowData={rowData} />,
  },
  {
    title: 'Ações',
    render: rowData => (
      <SizeActions rowData={rowData} onDeleteRequest={onDeleteRequest} />
    ),
  },
];

const ProductListPage = () => {
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
    productSizeList,
    productSizeListLoading,
    productSizeListTotal,
    productSizeDeleteLoading,
  } = useSelector(state => state.productSize);

  React.useEffect(() => {
    dispatch(SizeCreators.getProductSizeListRequest(localState));
  }, []);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  React.useEffect(() => {
    if (productSizeDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [productSizeDeleteLoading]);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(SizeCreators.getProductSizeListRequest(localState));
  }, [localState]);

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(SizeCreators.getProductSizeDeleteRequest(deleteState.item.id));
  };

  return (
    <PageBase>
      <HeaderComponent title="Listar tamanho">
        <SizeTableHeader
          getFunction={getFunction}
          initialValues={{ search: localState.search }}
        />
      </HeaderComponent>
      <Paper>
        <DefaultTable
          getFunction={getFunction}
          columns={columns({ onDeleteRequest })}
          data={productSizeList}
          total={productSizeListTotal}
          isLoading={productSizeListLoading}
          page={localState.page}
          perPage={localState.perPage}
          footer={<SizeFooter />}
        />
      </Paper>
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={productSizeDeleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Remover página: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default ProductListPage;
