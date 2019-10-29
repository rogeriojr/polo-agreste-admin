import React from 'react';
import PageBase from 'components/PageBase';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProductCreators } from 'store/ducks/product';
import HeaderComponent from 'components/HeaderComponent';
import ProductForm from 'components/Pages/ProductPage/ProductForm';
import { withRouter } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

const ProductUpdatePage = ({ match }) => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState(null);

  const { product, productLoading, productUpdateLoading } = useSelector(
    state => state.product,
  );

  const getInitialData = () => {
    const { params } = match;
    dispatch(ProductCreators.getProductRequest({ id: params.id }));
    setLocalState(null);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    
    const { params } = match;
    if (
      Object.keys(product).length > 0 &&
      !productLoading &&
      product.id === Number(params.id)
    ) {
      setLocalState({
        ...product,
        description: RichTextEditor.createValueFromString(
          product.description,
          'markdown',
        ),
        description_tec: RichTextEditor.createValueFromString(
          product.description_tec,
          'markdown',
        ),
        category_father: product.categories,
        images_info: product.images,
        images: '',
        images_data: [],
      });
    }
  }, [product]);

  const onSubmit = data => {
    dispatch(ProductCreators.getProductUpdateRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/catalog/products`));
  };

  return (
    <PageBase>
      <HeaderComponent title="Atualizar produto" />
      {localState && !productLoading && (
        <ProductForm
          initialValues={localState}
          isLoading={productUpdateLoading}
          onSubmit={onSubmit}
          handleBack={handleBack}
        />
      )}
    </PageBase>
  );
};

ProductUpdatePage.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(ProductUpdatePage);
