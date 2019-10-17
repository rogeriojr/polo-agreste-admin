import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as BannerCreators } from 'store/ducks/banner';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import BannerTableHeader from 'components/Pages/BannerPage/BannerTableHeader';
import BannerActions from 'components/Pages/BannerPage/BannerActions';
import { toPrice } from 'utils/converters';
import BannerStatus from 'components/Pages/BannerPage/BannerStatus';
import BannerFooter from 'components/Pages/BannerPage/BannerFooter';
import AlertDialog from 'components/AlertDialog';
import BannerImage from 'components/Pages/BannerPage/BannerImage';

const columns = ({ onDeleteRequest }) => [
  {
    title: 'Referência',
    field: 'id',
    sorting: false,
  },
  {
    title: 'Imagem',
    field: 'images',
    sorting: false,
    render: rowData => <BannerImage rowData={rowData} />,
  },
  {
    title: 'Nome',
    field: 'name',
    sorting: false,
  },
  {
    title: 'Status',
    sorting: false,
    render: rowData => <BannerStatus rowData={rowData} />,
  },
  {
    title: 'Ações',
    render: rowData => (
      <BannerActions rowData={rowData} onDeleteRequest={onDeleteRequest} />
    ),
  },
];

const BannerListPage = () => {
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
    bannerList,
    bannerListLoading,
    bannerListTotal,
    bannerDeleteLoading,
  } = useSelector(state => state.banner);

  React.useEffect(() => {
    dispatch(BannerCreators.getBannerListRequest(localState));
  }, []);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(BannerCreators.getBannerListRequest(localState));
  }, [localState]);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(BannerCreators.getBannerDeleteRequest(deleteState.item.id));
  };

  React.useEffect(() => {
    if (bannerDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [bannerDeleteLoading]);

  return (
    <PageBase>
      <HeaderComponent title="Listar Banner">
        <BannerTableHeader
          getFunction={getFunction}
          initialValues={{ search: localState.search }}
        />
      </HeaderComponent>
      <Paper>
        <DefaultTable
          getFunction={getFunction}
          columns={columns({ onDeleteRequest })}
          data={bannerList}
          total={bannerListTotal}
          isLoading={bannerListLoading}
          page={localState.page}
          perPage={localState.perPage}
          footer={<BannerFooter />}
        />
      </Paper>
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={bannerDeleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Remover produto: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default BannerListPage;
