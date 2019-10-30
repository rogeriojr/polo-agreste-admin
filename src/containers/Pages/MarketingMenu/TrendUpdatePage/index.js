import React from 'react';
import PageBase from 'components/PageBase';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as TrendCreators } from 'store/ducks/trend';
import HeaderComponent from 'components/HeaderComponent';
import TrendForm from 'components/Pages/TrendPage/TrendForm';
import { withRouter } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

const TrendUpdatePage = ({ match }) => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState(null);

  const { trend, trendLoading, trendUpdateLoading } = useSelector(
    state => state.trend,
  );

  const getInitialData = () => {
    const { params } = match;
    dispatch(TrendCreators.getTrendRequest({ id: params.id }));
    setLocalState(null);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    
    const { params } = match;
    if (
      Object.keys(trend).length > 0 &&
      !trendLoading &&
      trend.id === Number(params.id)
    ) {
      console.log(trend.images);
      setLocalState({
        ...trend,
        images_info: trend.images,
        images: '',
        images_data: [],
      });
    }
  }, [trend]);

  const onSubmit = data => {
    dispatch(TrendCreators.getTrendUpdateRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/marketing/trends`));
  };

  return (
    <PageBase>
      <HeaderComponent title="Atualizar tendência" />
      {localState && !trendLoading && (
        <TrendForm
          initialValues={localState}
          isLoading={trendUpdateLoading}
          onSubmit={onSubmit}
          handleBack={handleBack}
        />
      )}
    </PageBase>
  );
};

TrendUpdatePage.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(TrendUpdatePage);
