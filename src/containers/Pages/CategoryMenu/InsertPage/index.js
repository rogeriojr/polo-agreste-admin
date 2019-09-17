import React from 'react';
import PageBase from 'components/PageBase';
import CategoryForm from 'components/Pages/CategoryPage/CategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from 'store/ducks/category';

const CategoryNewPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getCategoryInsertRequest(data));
  };

  const { categoryInsertLoading } = useSelector(state => state.category);

  return (
    <PageBase title="Cadastrar Categoria">
      <CategoryForm onSubmit={onSubmit} isLoading={categoryInsertLoading} />
    </PageBase>
  );
};

export default CategoryNewPage;
