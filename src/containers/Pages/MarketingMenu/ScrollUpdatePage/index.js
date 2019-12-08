import React from 'react';
import PageBase from 'components/PageBase';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ScrollCreators } from 'store/ducks/scroll';
import HeaderComponent from 'components/HeaderComponent';
import ScrollForm from 'components/Pages/ScrollPage/ScrollForm';
import { withRouter } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

const ScrollUpdatePage = ({ match }) => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState(null);

  const { scroll, scrollLoading, scrollUpdateLoading } = useSelector(
    state => state.scroll,
  );

  const getInitialData = () => {
    const { params } = match;
    dispatch(ScrollCreators.getScrollRequest({ id: params.id }));
    setLocalState(null);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    
    const { params } = match;
    if (
      Object.keys(scroll).length > 0 &&
      !scrollLoading &&
      scroll.id === Number(params.id)
    ) {
      console.log(scroll.images);
      setLocalState({
        ...scroll,
        image_info: scroll.image,
        image: '',
        description: RichTextEditor.createValueFromString(
          scroll.description,
          'markdown',
        ),
      });
    }
  }, [scroll]);

  const onSubmit = data => {
    dispatch(ScrollCreators.getScrollUpdateRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/marketing/scrolls`));
  };

  return (
    <PageBase>
      <HeaderComponent title="Atualizar scroll" />
      {localState && !scrollLoading && (
        <ScrollForm
          initialValues={localState}
          isLoading={scrollUpdateLoading}
          onSubmit={onSubmit}
          handleBack={handleBack}
        />
      )}
    </PageBase>
  );
};

ScrollUpdatePage.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(ScrollUpdatePage);
