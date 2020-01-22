import React from 'react';
import PageBase from 'components/PageBase';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ShoppingCreators } from 'store/ducks/shopping';
import { Paper } from '@material-ui/core';
import HeaderComponent from 'components/HeaderComponent';
import { withRouter } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import GeneralForm from 'components/Pages/ConfigPageGeneral/GeneralForm';

const GeneralConfigPage = ({ match }) => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState(null);

  const { shopping, shoppingLoading, shoppingUpdateLoading } = useSelector(
    state => state.shopping,
  );

  const shoppingId = 1;

  const getInitialData = () => {
    dispatch(ShoppingCreators.getShoppingRequest({ id: shoppingId }));
    setLocalState(null);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    if (
      Object.keys(shopping).length > 0 &&
      !shoppingLoading &&
      shopping.id === Number(shoppingId)
    ) {
      setLocalState({
        ...shopping,
        description: RichTextEditor.createValueFromString(
          shopping.description,
          'markdown',
        ),
        image_info: shopping.image,
        image: '',
      });
    }
  }, [shopping, match, shoppingLoading]);

  const onSubmit = data => {
    console.log(data);
    dispatch(ShoppingCreators.getShoppingUpdateRequest(data));
  };

  return (
    <PageBase>
      <HeaderComponent title="Configurações gerais" />
      <Paper>
        {localState && (
          <GeneralForm
            initialValues={localState}
            onSubmit={onSubmit}
            isLoading={shoppingUpdateLoading}
          />
        )}
      </Paper>
    </PageBase>
  );
};

GeneralConfigPage.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(GeneralConfigPage);
