import React from 'react';
import DefaultTable from 'components/Tables/DefaultTable';
import HeaderComponent from 'components/HeaderComponent';
import CustomButton from 'components/form/components/CustomButton';


const columns = [
  { title: 'Nome', field: 'name' },
  { title: 'Perfil', field: 'profile' },
  { title: 'E-mail', field: 'email' },
  { title: 'CPF/CNPJ', field: 'cpf_cnpj' },
  { title: 'Telefone', field: 'phone' },
  { title: 'Cadastro', field: 'register' },
  { title: 'Acões', field: 'actions' },
];

const dataMok = [];

const ProductImportInfo = () => {
  return (
    <>
      <HeaderComponent title="Importações" variant="h6">
        <CustomButton label="Salvar" onClick={() => {}} style={{ backgroundColor: '#ce4899' }} />
      </HeaderComponent>
      <DefaultTable
        columns={columns}
        data={dataMok}
        total={dataMok.length}
        isLoading
      />
    </>
  );
};

export default ProductImportInfo;
