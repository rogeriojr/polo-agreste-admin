import React from 'react';
import { Formik, FastField, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import CustomTextField from 'components/form/components/CustomTextField';
import CustomSelect from 'components/form/components/CustomSelect';
import FormButtons from 'components/form/components/FormButtons';

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

const schema = Yup.object().shape({
  id: Yup.number(),
  code_integration: Yup.string(),
  code_ncm: Yup.string(),
  code_ean: Yup.string(),
  name: Yup.string().required('Campo obrigatório'),
  description: Yup.string().required('Campo obrigatório'),
  description_tec: Yup.string(),
  stock_control: Yup.string(),
  price: Yup.string(),
  price_discount: Yup.string(),
  price_whole: Yup.string(),
  price_whole_discount: Yup.string(),
  quantity_max: Yup.number(),
  quantity_min_whole: Yup.number(),
  quantity_max_whole: Yup.number(),
  height: Yup.string(),
  width: Yup.string(),
  length: Yup.string(),
  weight: Yup.string(),
  store: Yup.object().shape({
    id: Yup.number(),
  }),
  categories: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
    }),
  ),
});

const ProfileNewForm = ({
  onSubmit,
  initialValues,
  submitText,
  handleBackLabel,
  handleBack,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={schema}
    onSubmit={onSubmit}
    validateOnBlur
    enableReinitialize
    render={() => (
      <Form>
        <Card style={{ marginTop: 20 }}>
          <InputContainer>
            <Typography variant="h6" style={{ color: '#000', margin: 10 }}>
              Perfil de usuário
            </Typography>
          </InputContainer>
          <InputContainer>
            <InputItem>
              <FastField
                name="profile_control"
                label="Permissão do Perfil"
                options={[{ name: 'ADMIN', id: 0 }, { name: 'USER', id: 1 }]}
                component={CustomSelect}
                placeholder="Permissão do Perfil"
                isLoading={false}
              />
            </InputItem>
            <InputItem>
              <FastField
                name="profile_name"
                label="Nome"
                component={CustomTextField}
              />
            </InputItem>
          </InputContainer>
          <InputContainer>
            <InputItem>
              <hr />
              <br />
            </InputItem>
          </InputContainer>
          <InputContainer>
            <Typography variant="h6" style={{ color: '#000', margin: 10 }}>
              Parametrização das Funcionalidades
            </Typography>
          </InputContainer>

          <InputContainer>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Dashboard"
                isLoading={false}
              />
            </InputItem>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Entregas"
                isLoading={false}
              />
            </InputItem>
          </InputContainer>
          <InputContainer>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Lojas"
                isLoading={false}
              />
            </InputItem>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Pedidos"
                isLoading={false}
              />
            </InputItem>
          </InputContainer>
          <InputContainer>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Produtos"
                isLoading={false}
              />
            </InputItem>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Clientes"
                isLoading={false}
              />
            </InputItem>
          </InputContainer>
          <InputContainer>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Propriedades de Produtos"
                isLoading={false}
              />
            </InputItem>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Agentes"
                isLoading={false}
              />
            </InputItem>
          </InputContainer>
          <InputContainer>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Categorias"
                isLoading={false}
              />
            </InputItem>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Lookbook"
                isLoading={false}
              />
            </InputItem>
          </InputContainer>
          <InputContainer>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Estoque"
                isLoading={false}
              />
            </InputItem>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Relatórios"
                isLoading={false}
              />
            </InputItem>
          </InputContainer>
          <InputContainer>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Listas de Preços"
                isLoading={false}
              />
            </InputItem>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Layouts e Conteúdos"
                isLoading={false}
              />
            </InputItem>
          </InputContainer>
          <InputContainer>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Comentários"
                isLoading={false}
              />
            </InputItem>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Configurações"
                isLoading={false}
              />
            </InputItem>
          </InputContainer>
          <InputContainer>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="SEO"
                isLoading={false}
              />
            </InputItem>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Administradores"
                isLoading={false}
              />
            </InputItem>
          </InputContainer>
          <InputContainer>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Promoções"
                isLoading={false}
              />
            </InputItem>
            <InputItem>
              <FastField
                name="tipo_cat"
                options={[
                  { name: 'Item 01', id: 0 },
                  { name: 'Item 02', id: 1 },
                ]}
                component={CustomSelect}
                placeholder="Roadmap Colaborativo"
                isLoading={false}
              />
            </InputItem>
          </InputContainer>
          <FormButtons
            handleBack={handleBack}
            handleBackLabel={handleBackLabel}
            submitText={submitText}
          />
        </Card>
      </Form>
    )}
  />
);

ProfileNewForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
  handleBackLabel: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onSubmit: PropTypes.func.isRequired,
};

ProfileNewForm.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBackLabel: 'Voltar',
  handleBack: false,
};

export default ProfileNewForm;
