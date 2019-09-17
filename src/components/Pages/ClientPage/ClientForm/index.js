import React from 'react';
import { Formik, FastField, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import CustomTextField from 'components/form/components/CustomTextField';
import CustomButton from 'components/form/components/CustomButton';
import CustomSelect from 'components/form/components/CustomSelect';
import { useDispatch } from 'react-redux';
import { Creators as CategoryCreators } from 'store/ducks/category';
import { Creators as StoreCreators } from 'store/ducks/stores';
import CustomMaskField from 'components/form/components/CustomMaskField';



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

const ClientForm = ({
  initialValues = formInitialValues,
}) => {
  const dispatch = useDispatch();

  const getInitialData = () => {
    dispatch(CategoryCreators.getCategoryListRequest({ perPage: 1000 }));
    dispatch(StoreCreators.getStoreListRequest({ perPage: 1000 }));
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}

      validateOnBlur
      render={() => (
        <Form>
          <Card>
            <Typography style={{ padding: 8 }} variant="h6">
              Dados Básico
            </Typography>
            <InputContainer>
              <InputItem>
                <FastField
                  name="price_whole_discount"
                  label="Nome"
                  component={CustomTextField}
                />
              </InputItem>
              <InputItem>
                <FastField
                  name="name1"
                  label="Sobrenome"
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <FastField
                  name="tel"
                  label="Telefone principal"
                  component={CustomTextField}
                />
              </InputItem>
              <InputItem>
                <FastField
                  name="name2"
                  label="Telefone alternativo"
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <FastField
                  name="store_bank.doc_type"
                  label="Gênero"
                  options={[
                    { id: 'Masculino', name: 'Masculino' },
                    { id: 'Feminino', name: 'Feminino' },
                  ]}
                  placeholder="Gênero"
                  component={CustomSelect}
                  isLoading={false}
                />
              </InputItem>
              <InputItem>
                <FastField
                  name="name3"
                  label="Data de Nascimento"
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
            <hr style={{ marginTop: 30 }} />
            <Typography style={{ padding: 8 }} variant="h6">
              Endereço
            </Typography>
            <InputContainer>
              <InputItem>
                <FastField
                  margin="10px"
                  name="cnpj"
                  label="Rua 1, Qd. 01, Lt. 1"
                  component={CustomMaskField}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <FastField
                  name="price_whole_discount4"
                  label="Numero"
                  component={CustomTextField}
                />
              </InputItem>
              <InputItem>
                <FastField
                  name="name5"
                  label="Bairro "
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <FastField
                  name="price_whole_discount6"
                  label="Complemento"
                  component={CustomTextField}
                />
              </InputItem>
              <InputItem>
                <FastField
                  name="name7"
                  label="CEP"
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <FastField
                  name="address.city.id"
                  label="Municipio"
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
            <hr style={{ marginTop: 30 }}/>

            <Typography style={{ padding: 8 }} variant="h6">
              Informações do usuário
            </Typography>
            <InputContainer  >
              <InputItem>
                <FastField
                  margin="10px"
                  name="cnpj1"
                  label="Consumidor"
                  component={CustomMaskField}

                />
              </InputItem>
            </InputContainer>

            <InputContainer>
              <InputItem>
                <FastField
                  name="price_whole_discount9"
                  label="E-mail"
                  component={CustomTextField}
                />
              </InputItem>
              <InputItem>
                <FastField
                  name="name12"
                  label="Confirmar e-mail "
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>

           <InputContainer style={{ padding:"20px", marginTop:30, justifyContent:"flex-end"}}>
                <CustomButton    style={{ width: 150,  marginRight: 21, backgroundColor: 'transparent', color:"red", border:"1px solid red" }}
                label={"LIMPAR CAMPOS"} />
                <CustomButton   style={{ width: 100, marginRight: 21,backgroundColor: 'transparent', color:"red", border:"1px solid red"}}
                label={"CANCELAR"}  />

                <CustomButton   style={{ width: 100, marginRight: 21, backgroundColor: '#B5B5B5' }}
                label={"SALVAR"} />
                </InputContainer>
          </Card>
        </Form>
      )}
    />
  );
};

ClientForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
};



export default ClientForm;
