import React from 'react';
import PageBase from 'components/PageBase';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as UserCreators } from 'store/ducks/user';
import HeaderComponent from 'components/HeaderComponent';
import UserForm from 'components/Pages/UserPage/UserForm';
import { withRouter } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

const UserUpdatePage = ({ match }) => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState(null);

  const { user, userLoading, userUpdateLoading } = useSelector(
    state => state.user,
  );

  const getInitialData = () => {
    const { params } = match;
    dispatch(UserCreators.getUserRequest({ id: params.id }));
    setLocalState(null);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    const { params } = match;
    if (
      Object.keys(user).length > 0 &&
      !userLoading &&
      user.id === Number(params.id)
    ) {
      setLocalState({
        ...user,
        password: '',
        description: RichTextEditor.createValueFromString(
          user.description,
          'markdown',
        ),
        image_info: user.image,
        image: '',
      });
    }
  }, [user]);

  const onSubmit = data => {
    dispatch(UserCreators.getUserUpdateRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/user`));
  };

  return (
    <PageBase>
      <HeaderComponent title="Atualizar usuário" />
      {localState && (
        <UserForm
          initialValues={localState}
          onSubmit={onSubmit}
          handleBack={handleBack}
          isLoading={userUpdateLoading}
        />
      )}
    </PageBase>
  );
};

UserUpdatePage.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(UserUpdatePage);
