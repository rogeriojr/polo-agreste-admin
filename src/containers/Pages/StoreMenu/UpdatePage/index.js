import React from 'react';
import PageBase from 'components/PageBase';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as StoreCreators } from 'store/ducks/stores';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import StoreForm from 'components/Pages/StorePage/StoreForm';
import { withRouter } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

const StoreUpdatePage = ({ match }) => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState(null);

  const { store, storeLoading, storeUpdateLoading } = useSelector(
    state => state.store,
  );

  const getInitialData = () => {
    const { params } = match;
    dispatch(StoreCreators.getStoreRequest({ id: params.id }));
    setLocalState(null);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    const { params } = match;
    if (
      Object.keys(store).length > 0 &&
      !storeLoading &&
      store.id === Number(params.id)
    ) {
      setLocalState({
        ...store,
        description: RichTextEditor.createValueFromString(
          store.description,
          'markdown',
        ),
        image_info: store.image,
        image: '',
      });
    }
  }, [store, match, storeLoading]);

  const onSubmit = data => {
    dispatch(StoreCreators.getStoreUpdateRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/store`));
  };

  return (
    <PageBase>
      <HeaderComponent title="Atualizar loja" />
      <Paper>
        {localState && (
          <StoreForm
            initialValues={localState}
            onSubmit={onSubmit}
            handleBack={handleBack}
            isLoading={storeUpdateLoading}
          />
        )}
      </Paper>
    </PageBase>
  );
};

StoreUpdatePage.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(StoreUpdatePage);
