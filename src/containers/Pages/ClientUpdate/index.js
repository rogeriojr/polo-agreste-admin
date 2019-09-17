import React from 'react';
import PageBase from 'components/PageBase';

import HeaderComponent from 'components/HeaderComponent';
import ClientForm from 'components/Pages/ClientPage/ClientForm';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

const ClientUpdate = ({ match }) => {
  return (
    <PageBase>
      <HeaderComponent title="Editar" />
      <ClientForm />
    </PageBase>
  );
};

ClientUpdate.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(ClientUpdate);
