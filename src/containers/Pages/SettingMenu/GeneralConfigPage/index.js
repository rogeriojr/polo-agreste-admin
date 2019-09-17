import React from 'react';

import PageBase from 'components/PageBase';
import GeneralForm from 'components/Pages/ConfigPageGeneral/GeneralForm';
import HeaderComponent from 'components/HeaderComponent';

const SettingGeneralConfigPage = () => (
  <PageBase>
    <HeaderComponent title="Configurações Gerais" />
    <GeneralForm />
  </PageBase>
);

export default SettingGeneralConfigPage;
