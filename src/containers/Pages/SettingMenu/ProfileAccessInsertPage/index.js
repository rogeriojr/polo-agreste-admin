import React from 'react';
import PageBase from 'components/PageBase';
import ProfileNewForm from 'components/Pages/ClientPage/ProfileNewForm';
import HeaderComponent from 'components/HeaderComponent';

const ProfileAccessNewPage = () => (
  <PageBase>
    <HeaderComponent title="Cadastrar Perfil de Acesso" />
    <ProfileNewForm />
  </PageBase>
);

export default ProfileAccessNewPage;
