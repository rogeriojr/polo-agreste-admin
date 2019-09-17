import React from 'react';
import PageBase from 'components/PageBase';
import HeaderComponent from 'components/HeaderComponent';
import ProfileNewForm from 'components/Pages/ClientPage/ProfileNewForm';

const ClientProfileNewPage = () => {
  const onSubmit = data => {
    console.log(data);
  };
  return (
    <PageBase>
      <HeaderComponent title="Cadastrar Perfil de Cliente" />
      <ProfileNewForm onSubmit={onSubmit} />
    </PageBase>
  );
};

export default ClientProfileNewPage;
