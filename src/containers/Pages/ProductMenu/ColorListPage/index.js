import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ColorCreators } from 'store/ducks/productColor';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import ColorTableHeader from 'components/Pages/ColorPage/ColorTableHeader';
import ColorActions from 'components/Pages/ColorPage/ColorActions';
import AlertDialog from 'components/AlertDialog';
import ColorStatus from 'components/Pages/ColorPage/ColorStatus';
import ColorFooter from 'components/Pages/ColorPage/ColorFooter';

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
    render: rowData => <ColorStatus rowData={rowData} />,
  },
  {
    title: 'Ações',
    render: rowData => (
      <ColorActions rowData={rowData} onDeleteRequest={onDeleteRequest} />
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
    productColorList,
    productColorListLoading,
    productColorListTotal,
    productColorDeleteLoading,
  } = useSelector(state => state.productColor);

  React.useEffect(() => {
    dispatch(ColorCreators.getProductColorListRequest(localState));
  }, []);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  React.useEffect(() => {
    if (productColorDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [productColorDeleteLoading]);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(ColorCreators.getProductColorListRequest(localState));
  }, [localState]);

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(ColorCreators.getProductColorDeleteRequest(deleteState.item.id));
  };

  return (
    <PageBase>
      <HeaderComponent title="Listar Cor">
        <ColorTableHeader
          getFunction={getFunction}
          initialValues={{ search: localState.search }}
        />
      </HeaderComponent>
      <Paper>
        <DefaultTable
          getFunction={getFunction}
          columns={columns({ onDeleteRequest })}
          data={productColorList}
          total={productColorListTotal}
          isLoading={productColorListLoading}
          page={localState.page}
          perPage={localState.perPage}
          footer={<ColorFooter />}
        />
      </Paper>
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={productColorDeleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Remover página: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default ProductListPage;
