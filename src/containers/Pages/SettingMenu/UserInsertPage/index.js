import React from 'react';
import PageBase from 'components/PageBase';
import UserForm from 'components/Pages/UserPage/UserForm';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from 'store/ducks/user';
import { push } from 'connected-react-router';

const UserListPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getUserInsertRequest(data));
  };

  const handleBack = () => {
    dispatch(push(`/user`));
  };

  const { userInsertLoading } = useSelector(state => state.user);

  return (
    <PageBase title="Cadastrar Usuário">
      <UserForm
        onSubmit={onSubmit}
        handleBack={handleBack}
        isLoading={userInsertLoading}
      />
    </PageBase>
  );
};

export default UserListPage;
