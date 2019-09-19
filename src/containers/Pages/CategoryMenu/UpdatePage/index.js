import React from 'react';
import PageBase from 'components/PageBase';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CategoryCreators } from 'store/ducks/category';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import CategoryForm from 'components/Pages/CategoryPage/CategoryForm';
import { withRouter } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

const CategoryUpdatePage = ({ match }) => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState(null);

  const { category, categoryLoading, categoryUpdateLoading } = useSelector(
    state => state.category,
  );

  const getInitialData = () => {
    const { params } = match;
    dispatch(CategoryCreators.getCategoryRequest({ id: params.id }));
    setLocalState(null);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    const { params } = match;
    if (
      Object.keys(category).length > 0 &&
      !categoryLoading &&
      category.id === Number(params.id)
    ) {
      setLocalState({
        ...category,
        description: RichTextEditor.createValueFromString(
          category.description,
          'markdown',
        ),
        image_info: category.image,
        image: '',
      });
    }
  }, [category]);

  const onSubmit = data => {
    dispatch(CategoryCreators.getCategoryUpdateRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/category`));
  };

  return (
    <PageBase>
      <HeaderComponent title="Atualizar categoria" />
      {localState && (
        <CategoryForm
          initialValues={localState}
          isLoading={categoryUpdateLoading}
          onSubmit={onSubmit}
          handleBack={handleBack}
        />
      )}
    </PageBase>
  );
};

CategoryUpdatePage.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(CategoryUpdatePage);
