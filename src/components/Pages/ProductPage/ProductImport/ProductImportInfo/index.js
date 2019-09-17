import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core';

import DefaultTable from 'components/Tables/DefaultTable';
import FormButtons from 'components/form/components/FormButtons';
import HeaderComponent from 'components/HeaderComponent';

const TabContainer = ({ children }) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export const formInitialValues = {
  id: '',
  code_integration: '',
  code_ncm: '',
  code_ean: '',
  name: '',
  description: '',
  description_tec: '',
  stock_control: '',
  price: '',
  price_discount: '',
  price_whole: '',
  price_whole_discount: '',
  quantity_max: '',
  quantity_min_whole: '',
  quantity_max_whole: '',
  height: '',
  width: '',
  length: '',
  weight: '',
  store: {},
  categories: [],
};

const columns = [
  { title: 'Campo', field: 'field' },
  { title: 'Tipo', field: 'type' },
  { title: 'Obrigatorio', field: 'required' },
  { title: 'Descrição', field: 'description' },
  { title: 'Exemplo', field: 'exemple' },
];

const dataMok = [
  {
    field: 'Nome campo',
    type: 'String',
    required: 'SIM',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus elit lacus, quis dictum lacus sollicitudin.',
    exemple: '2019-11-30T10:15:00-03:00',
  },
  {
    field: 'Nome campo',
    type: 'String',
    required: 'SIM',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus elit lacus, quis dictum lacus sollicitudin.',
    exemple: '2019-11-30T10:15:00-03:00',
  },
  {
    field: 'Nome campo',
    type: 'String',
    required: 'SIM',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus elit lacus, quis dictum lacus sollicitudin.',
    exemple: '2019-11-30T10:15:00-03:00',
  },
  {
    field: 'Nome campo',
    type: 'String',
    required: 'SIM',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus elit lacus, quis dictum lacus sollicitudin.',
    exemple: '2019-11-30T10:15:00-03:00',
  },
  {
    field: 'Nome campo',
    type: 'String',
    required: 'SIM',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus elit lacus, quis dictum lacus sollicitudin.',
    exemple: '2019-11-30T10:15:00-03:00',
  },
];

const ProductImportInfo = ({ handleBack, submitText }) => {
  return (
    <Card style={{ marginTop: 20, padding: 10 }}>
      <HeaderComponent title="Informações da Loja">
        <FormButtons handleBack={handleBack} submitText={submitText} />
      </HeaderComponent>
      <DefaultTable
        columns={columns}
        data={dataMok}
        total={dataMok.length}
        isLoading={false}
      />
    </Card>
  );
};

ProductImportInfo.propTypes = {
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

ProductImportInfo.defaultProps = {
  submitText: 'SALVAR',
  handleBack: false,
};

export default ProductImportInfo;
