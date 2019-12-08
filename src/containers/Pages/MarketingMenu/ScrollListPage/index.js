import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ScrollCreators } from 'store/ducks/scroll';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import ScrollTableHeader from 'components/Pages/ScrollPage/ScrollTableHeader';
import ScrollActions from 'components/Pages/ScrollPage/ScrollActions';
import { toPrice } from 'utils/converters';
import ScrollStatus from 'components/Pages/ScrollPage/ScrollStatus';
import ScrollFooter from 'components/Pages/ScrollPage/ScrollFooter';
import AlertDialog from 'components/AlertDialog';
import ScrollImage from 'components/Pages/ScrollPage/ScrollImage';

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
    render: rowData => <ScrollImage rowData={rowData} />,
  },
  {
    title: 'Nome',
    field: 'name',
    sorting: false,
  },
  {
    title: 'Status',
    sorting: false,
    render: rowData => <ScrollStatus rowData={rowData} />,
  },
  {
    title: 'Ações',
    render: rowData => (
      <ScrollActions rowData={rowData} onDeleteRequest={onDeleteRequest} />
    ),
  },
];

const ScrollListPage = () => {
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
    scrollList,
    scrollListLoading,
    scrollListTotal,
    scrollDeleteLoading,
  } = useSelector(state => state.scroll);

  React.useEffect(() => {
    dispatch(ScrollCreators.getScrollListRequest(localState));
  }, []);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(ScrollCreators.getScrollListRequest(localState));
  }, [localState]);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(ScrollCreators.getScrollDeleteRequest(deleteState.item.id));
  };

  React.useEffect(() => {
    if (scrollDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [scrollDeleteLoading]);

  return (
    <PageBase>
      <HeaderComponent title="Listar Scroll">
        <ScrollTableHeader
          getFunction={getFunction}
          initialValues={{ search: localState.search }}
        />
      </HeaderComponent>
      <Paper>
        <DefaultTable
          getFunction={getFunction}
          columns={columns({ onDeleteRequest })}
          data={scrollList}
          total={scrollListTotal}
          isLoading={scrollListLoading}
          page={localState.page}
          perPage={localState.perPage}
          footer={<ScrollFooter />}
        />
      </Paper>
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={scrollDeleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Remover produto: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default ScrollListPage;
