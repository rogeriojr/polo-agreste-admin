import React from 'react';
import PageBase from 'components/PageBase';
import CategoryForm from 'components/Pages/CategoryPage/CategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from 'store/ducks/category';
import { push } from 'connected-react-router';

const CategoryNewPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getCategoryInsertRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/category`));
  };

  const { categoryInsertLoading } = useSelector(state => state.category);

  return (
    <PageBase title="Cadastrar Categoria">
      <CategoryForm
        onSubmit={onSubmit}
        handleBack={handleBack}
        isLoading={categoryInsertLoading}
      />
    </PageBase>
  );
};

export default CategoryNewPage;
