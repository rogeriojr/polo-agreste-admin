import React from 'react';
import PageBase from 'components/PageBase';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as VirtualCatalogCreators } from 'store/ducks/virtualCatalog';
import HeaderComponent from 'components/HeaderComponent';
import VirtualCatalogForm from 'components/Pages/VirtualCatalogPage/VirtualCatalogForm';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

const VirtualCatalogUpdatePage = ({ match }) => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState(null);

  const {
    virtualCatalog,
    virtualCatalogLoading,
    virtualCatalogUpdateLoading,
  } = useSelector(state => state.virtualCatalog);

  const getInitialData = () => {
    const { params } = match;
    dispatch(
      VirtualCatalogCreators.getVirtualCatalogRequest({ id: params.id }),
    );
    setLocalState(null);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    const { params } = match;
    if (
      Object.keys(virtualCatalog).length > 0 &&
      !virtualCatalogLoading &&
      virtualCatalog.id === Number(params.id)
    ) {
      setLocalState({
        ...virtualCatalog,
        image_info: virtualCatalog.image,
        image: '',
      });
    }
  }, [virtualCatalog]);

  const onSubmit = data => {
    dispatch(VirtualCatalogCreators.getVirtualCatalogUpdateRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/virtual/catalogs`));
  };

  return (
    <PageBase>
      <HeaderComponent title="Atualizar Catálogo Virtual" />
      {localState && (
        <VirtualCatalogForm
          initialValues={localState}
          isLoading={virtualCatalogUpdateLoading}
          onSubmit={onSubmit}
          handleBack={handleBack}
        />
      )}
    </PageBase>
  );
};

VirtualCatalogUpdatePage.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(VirtualCatalogUpdatePage);
