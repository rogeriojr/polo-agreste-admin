import React from 'react';
import PageBase from 'components/PageBase';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProductCreators } from 'store/ducks/productColor';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import ColorForm from 'components/Pages/ColorPage/ColorForm';
import { withRouter } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

const ColorUpdatePage = ({ match }) => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState(null);

  const { productColor, productColorLoading } = useSelector(
    state => state.productColor,
  );

  const getInitialData = () => {
    const { params } = match;
    dispatch(ProductCreators.getProductColorRequest({ id: params.id }));
    setLocalState(null);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    const { params } = match;
    if (
      Object.keys(productColor).length > 0 &&
      !productColorLoading &&
      productColor.id === Number(params.id)
    ) {
      setLocalState({
        ...productColor,
      });
    }
  }, [productColor]);

  const onSubmit = data => {
    dispatch(ProductCreators.getProductColorUpdateRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/catalog/colors`));
  };

  return (
    <PageBase>
      <HeaderComponent title="Atualizar cor" />
      {localState && (
        <ColorForm
          initialValues={localState}
          handleBack={handleBack}
          onSubmit={onSubmit}
        />
      )}
    </PageBase>
  );
};

ColorUpdatePage.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(ColorUpdatePage);
