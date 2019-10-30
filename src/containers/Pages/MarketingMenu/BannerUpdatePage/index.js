import React from 'react';
import PageBase from 'components/PageBase';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as BannerCreators } from 'store/ducks/banner';
import HeaderComponent from 'components/HeaderComponent';
import BannerForm from 'components/Pages/BannerPage/BannerForm';
import { withRouter } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

const BannerUpdatePage = ({ match }) => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState(null);

  const { banner, bannerLoading, bannerUpdateLoading } = useSelector(
    state => state.banner,
  );

  const getInitialData = () => {
    const { params } = match;
    dispatch(BannerCreators.getBannerRequest({ id: params.id }));
    setLocalState(null);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    
    const { params } = match;
    if (
      Object.keys(banner).length > 0 &&
      !bannerLoading &&
      banner.id === Number(params.id)
    ) {
      console.log(banner.images);
      setLocalState({
        ...banner,
        images_info: banner.images,
        images: '',
        images_data: [],
      });
    }
  }, [banner]);

  const onSubmit = data => {
    dispatch(BannerCreators.getBannerUpdateRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/marketing/banners`));
  };

  return (
    <PageBase>
      <HeaderComponent title="Atualizar banner" />
      {localState && !bannerLoading && (
        <BannerForm
          initialValues={localState}
          isLoading={bannerUpdateLoading}
          onSubmit={onSubmit}
          handleBack={handleBack}
        />
      )}
    </PageBase>
  );
};

BannerUpdatePage.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(BannerUpdatePage);
