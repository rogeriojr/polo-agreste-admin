import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CouponCreators } from 'store/ducks/coupon';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import CouponTableHeader from 'components/Pages/CouponPage/CouponTableHeader';
import CouponActions from 'components/Pages/CouponPage/CouponActions';
import AlertDialog from 'components/AlertDialog';
import CouponStatus from 'components/Pages/CouponPage/CouponStatus';
import CouponFooter from 'components/Pages/CouponPage/CouponFooter';

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
    title: 'Código',
    field: 'code',
    sorting: false,
  },
  {
    title: 'Status',
    field: 'status',
    sorting: false,
    render: rowData => <CouponStatus rowData={rowData} />,
  },
  {
    title: 'Ações',
    render: rowData => (
      <CouponActions rowData={rowData} onDeleteRequest={onDeleteRequest} />
    ),
  },
];

const CouponListPage = () => {
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
    couponList,
    couponListLoading,
    couponListTotal,
    couponDeleteLoading,
  } = useSelector(state => state.coupon);

  React.useEffect(() => {
    dispatch(CouponCreators.getCouponListRequest(localState));
  }, []);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  React.useEffect(() => {
    if (couponDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [couponDeleteLoading]);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(CouponCreators.getCouponListRequest(localState));
  }, [localState]);

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(CouponCreators.getCouponDeleteRequest(deleteState.item.id));
  };

  return (
    <PageBase>
      <HeaderComponent title="Listar Cupom">
        <CouponTableHeader
          getFunction={getFunction}
          initialValues={{ search: localState.search }}
        />
      </HeaderComponent>
      <Paper>
        <DefaultTable
          getFunction={getFunction}
          columns={columns({ onDeleteRequest })}
          data={couponList}
          total={couponListTotal}
          isLoading={couponListLoading}
          page={localState.page}
          perPage={localState.perPage}
          footer={<CouponFooter />}
        />
      </Paper>
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={couponDeleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Remover página: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default CouponListPage;
