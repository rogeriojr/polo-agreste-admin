import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as TrendCreators } from 'store/ducks/trend';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import TrendTableHeader from 'components/Pages/TrendPage/TrendTableHeader';
import TrendActions from 'components/Pages/TrendPage/TrendActions';
import { toPrice } from 'utils/converters';
import TrendStatus from 'components/Pages/TrendPage/TrendStatus';
import TrendFooter from 'components/Pages/TrendPage/TrendFooter';
import AlertDialog from 'components/AlertDialog';
import TrendImage from 'components/Pages/TrendPage/TrendImage';

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
    render: rowData => <TrendImage rowData={rowData} />,
  },
  {
    title: 'Nome',
    field: 'name',
    sorting: false,
  },
  {
    title: 'Status',
    sorting: false,
    render: rowData => <TrendStatus rowData={rowData} />,
  },
  {
    title: 'Ações',
    render: rowData => (
      <TrendActions rowData={rowData} onDeleteRequest={onDeleteRequest} />
    ),
  },
];

const TrendListPage = () => {
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
    trendList,
    trendListLoading,
    trendListTotal,
    trendDeleteLoading,
  } = useSelector(state => state.trend);

  React.useEffect(() => {
    dispatch(TrendCreators.getTrendListRequest(localState));
  }, []);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(TrendCreators.getTrendListRequest(localState));
  }, [localState]);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(TrendCreators.getTrendDeleteRequest(deleteState.item.id));
  };

  React.useEffect(() => {
    if (trendDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [trendDeleteLoading]);

  return (
    <PageBase>
      <HeaderComponent title="Listar tendência">
        <TrendTableHeader
          getFunction={getFunction}
          initialValues={{ search: localState.search }}
        />
      </HeaderComponent>
      <Paper>
        <DefaultTable
          getFunction={getFunction}
          columns={columns({ onDeleteRequest })}
          data={trendList}
          total={trendListTotal}
          isLoading={trendListLoading}
          page={localState.page}
          perPage={localState.perPage}
          footer={<TrendFooter />}
        />
      </Paper>
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={trendDeleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Remover produto: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default TrendListPage;
