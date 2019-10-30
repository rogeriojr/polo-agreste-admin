import React from 'react';
import PageBase from 'components/PageBase';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as KitCreators } from 'store/ducks/kit';
import HeaderComponent from 'components/HeaderComponent';
import KitForm from 'components/Pages/KitPage/KitForm';
import { withRouter } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

const KitUpdatePage = ({ match }) => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState(null);

  const { kit, kitLoading, kitUpdateLoading } = useSelector(
    state => state.kit,
  );

  const getInitialData = () => {
    const { params } = match;
    dispatch(KitCreators.getKitRequest({ id: params.id }));
    setLocalState(null);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    
    const { params } = match;
    if (
      Object.keys(kit).length > 0 &&
      !kitLoading &&
      kit.id === Number(params.id)
    ) {
      console.log(kit.images);
      setLocalState({
        ...kit,
        images_info: kit.images,
        images: '',
        images_data: [],
      });
    }
  }, [kit]);

  const onSubmit = data => {
    dispatch(KitCreators.getKitUpdateRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/catalog/kits`));
  };

  return (
    <PageBase>
      <HeaderComponent title="Atualizar kit" />
      {localState && !kitLoading && (
        <KitForm
          initialValues={localState}
          isLoading={kitUpdateLoading}
          onSubmit={onSubmit}
          handleBack={handleBack}
        />
      )}
    </PageBase>
  );
};

KitUpdatePage.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(KitUpdatePage);
