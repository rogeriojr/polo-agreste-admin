import React from 'react';
import PageBase from 'components/PageBase';
import UserForm from 'components/Pages/UserPage/UserForm';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from 'store/ducks/user';

const UserListPage = () => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(Creators.getUserInsertRequest(data));
  };

  const { userInsertLoading } = useSelector(state => state.user);

  return (
    <PageBase title="Cadastrar Usuário">
      <UserForm onSubmit={onSubmit} isLoading={userInsertLoading} />
    </PageBase>
  );
};

export default UserListPage;
