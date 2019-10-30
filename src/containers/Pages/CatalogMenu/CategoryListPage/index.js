import React from 'react';
import PageBase from 'components/PageBase';
import DefaultTable from 'components/Tables/DefaultTable';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CategoryCreators } from 'store/ducks/category';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import CategoryTableHeader from 'components/Pages/CategoryPage/CategoryTableHeader';
import CategoryActions from 'components/Pages/CategoryPage/CategoryActions';
import AlertDialog from 'components/AlertDialog';
import CategoryImage from 'components/Pages/CategoryPage/CategoryImage';

const columns = ({ onDeleteRequest }) => [
  {
    title: 'Referência',
    field: 'id',
    sorting: false,
  },
  {
    title: 'Imagem',
    field: 'image',
    sorting: false,
    render: rowData => <CategoryImage rowData={rowData} />,
  },
  {
    title: 'Nome',
    field: 'name',
    sorting: false,
  },
  {
    title: 'Categoria Pai',
    field: 'category_father.name',
    sorting: false,
  },
  {
    title: 'Ações',
    render: rowData => (
      <CategoryActions rowData={rowData} onDeleteRequest={onDeleteRequest} />
    ),
  },
];

const CategoryListPage = () => {
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
    categoryList,
    categoryListLoading,
    categoryListTotal,
    categoryDeleteLoading,
  } = useSelector(state => state.category);

  React.useEffect(() => {
    dispatch(CategoryCreators.getCategoryListRequest(localState));
  }, []);

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  React.useEffect(() => {
    if (categoryDeleteLoading === false && deleteState.open) {
      handleAlertDialogClose();
    }
  }, [categoryDeleteLoading]);

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  React.useEffect(() => {
    dispatch(CategoryCreators.getCategoryListRequest(localState));
  }, [localState]);

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const onDeleteConfirm = () => {
    dispatch(CategoryCreators.getCategoryDeleteRequest(deleteState.item.id));
  };

  return (
    <PageBase>
      <HeaderComponent title="Listar Categorias">
        <CategoryTableHeader
          getFunction={getFunction}
          initialValues={{ search: localState.search }}
        />
      </HeaderComponent>
      <Paper>
        <DefaultTable
          getFunction={getFunction}
          columns={columns({ onDeleteRequest })}
          data={categoryList}
          total={categoryListTotal}
          isLoading={categoryListLoading}
          page={localState.page}
          perPage={localState.perPage}
        />
      </Paper>
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={categoryDeleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Remover categoria: ${deleteState.item.name}`}
      />
    </PageBase>
  );
};

export default CategoryListPage;
