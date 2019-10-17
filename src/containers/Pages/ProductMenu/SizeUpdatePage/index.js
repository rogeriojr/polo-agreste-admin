import React from 'react';
import PageBase from 'components/PageBase';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProductCreators } from 'store/ducks/productSize';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import SizeForm from 'components/Pages/SizePage/SizeForm';
import { withRouter } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

const SizeUpdatePage = ({ match }) => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState(null);

  const { productSize, productSizeLoading } = useSelector(
    state => state.productSize,
  );

  const getInitialData = () => {
    const { params } = match;
    dispatch(ProductCreators.getProductSizeRequest({ id: params.id }));
    setLocalState(null);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    const { params } = match;
    if (
      Object.keys(productSize).length > 0 &&
      !productSizeLoading &&
      productSize.id === Number(params.id)
    ) {
      setLocalState({
        ...productSize,
      });
    }
  }, [productSize]);

  const onSubmit = data => {
    dispatch(ProductCreators.getProductSizeUpdateRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/size`));
  };

  return (
    <PageBase>
      <HeaderComponent title="Atualizar tamanho" />
      {localState && (
        <SizeForm
          initialValues={localState}
          handleBack={handleBack}
          onSubmit={onSubmit}
        />
      )}
    </PageBase>
  );
};

SizeUpdatePage.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(SizeUpdatePage);
