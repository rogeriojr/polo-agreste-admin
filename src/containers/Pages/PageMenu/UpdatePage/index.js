import React from 'react';
import PageBase from 'components/PageBase';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as PageCreators } from 'store/ducks/page';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import PageForm from 'components/Pages/PageComponents/PageForm';
import { withRouter } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

const PageUpdatePage = ({ match }) => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState(null);

  const { page, pageLoading } = useSelector(state => state.page);

  const getInitialData = () => {
    const { params } = match;
    dispatch(PageCreators.getPageRequest({ id: params.id }));
    setLocalState(null);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    const { params } = match;
    if (
      Object.keys(page).length > 0 &&
      !pageLoading &&
      page.id === Number(params.id)
    ) {
      setLocalState({
        ...page,
        description: RichTextEditor.createValueFromString(
          page.description,
          'markdown',
        ),
      });
    }
  }, [page]);

  const onSubmit = data => {
    dispatch(PageCreators.getPageUpdateRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/page`));
  };

  return (
    <PageBase>
      <HeaderComponent title="Atualizar página" />
      {localState && (
        <PageForm
          initialValues={localState}
          handleBack={handleBack}
          onSubmit={onSubmit}
        />
      )}
    </PageBase>
  );
};

PageUpdatePage.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(PageUpdatePage);
