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

  const stateApp = useSelector(state => state.app);
  const jwtIdentity = stateApp.get('jwtIdentity');
  
  const storeId = jwtIdentity.store_id;

  const getInitialData = () => {
    dispatch(StoreCreators.getStoreRequest({ id: storeId }));
    setLocalState(null);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    if (
      Object.keys(store).length > 0 &&
      !storeLoading &&
      store.id === Number(storeId)
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

  return (
    <PageBase>
      <HeaderComponent title="Minha loja" />
      <Paper>
        {localState && (
          <StoreForm
            initialValues={localState}
            onSubmit={onSubmit}
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
