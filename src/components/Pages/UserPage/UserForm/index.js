import React from 'react';
import { Formik, Field, FastField, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core';
import { Tab, Tabs } from 'components/Layout/Tabs';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import CustomTextField from 'components/form/components/CustomTextField';
import CustomSelect from 'components/form/components/CustomSelect';
import FormButtons from 'components/form/components/FormButtons';
import CustomRichText from 'components/form/components/CustomRichText';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as GroupCreators } from 'store/ducks/group';
import { Creators as CityCreators } from 'store/ducks/city';
import { Creators as StoreCreators } from 'store/ducks/stores';
import { Creators as AddressCreators } from 'store/ducks/address';
import CustomMaskField from 'components/form/components/CustomMaskField';
import CustomInputDate from 'components/form/components/CustomInputDate';
import validators from 'utils/validators';
import { validateBr } from 'js-brasil';
import CustomImageField from 'components/form/components/CustomImageField';
import { formatCityName } from 'utils/converters';

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
  email: '',
  password: '',
  password_confirm: '',
  name: '',
  cpf: '',
  genre: '',
  description: '',
  cell_phone: '',
  birth_date: '',
  group: {
    id: '',
  },
  store: {
    id: '',
  },
  address: {
    code_post: '',
    street: '',
    number: '',
    district: '',
    complement: '',
    city: {
      id: '',
    },
  },
  image: '',
  image_data: '',
  image_info: '',
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('Campo obrigatório'),
  password: Yup.string(),
  password_confirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Senhas não iguais',
  ),
  name: Yup.string().required('Campo obrigatório'),
  cpf: Yup.string()
    .test(...validators.cpfInvalid('CPF inválido'))
    .required('Obrigatório'),
  genre: Yup.string(),
  description: Yup.string(),
  cell_phone: Yup.string(),
  birth_date: Yup.string(),
  group: Yup.object().shape({
    id: Yup.string(),
  }),
  store: Yup.object().shape({
    id: Yup.string(),
  }),
  address: Yup.object().shape({
    code_post: Yup.string(),
    street: Yup.string(),
    number: Yup.string().test(...validators.numberNotRequired()),
    district: Yup.string(),
    complement: Yup.string(),
    city: Yup.object().shape({
      id: Yup.string().test(...validators.numberNotRequired()),
    }),
  }),
});

const UserForm = ({
  onSubmit,
  initialValues = formInitialValues,
  submitText,
  handleBack,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const { groupList, groupListLoading } = useSelector(state => state.group);
  const { cityList, cityListLoading } = useSelector(state => state.city);
  const { storeList, storeListLoading } = useSelector(state => state.store);
  const { addressValidate, addressValidateLoading } = useSelector(
    state => state.address,
  );

  const [formikForm, setFormikForm] = React.useState({});

  const getInitialData = () => {
    dispatch(GroupCreators.getGroupListRequest({ perPage: 1000 }));
    dispatch(CityCreators.getCityListRequest({ perPage: 10000 }));
    dispatch(StoreCreators.getStoreListRequest({ perPage: 1000 }));
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (
      addressValidateLoading === false &&
      formikForm.setFieldValue &&
      addressValidate
    ) {
      formikForm.setFieldValue('address.street', addressValidate.street);
      formikForm.setFieldValue('address.district', addressValidate.district);
      formikForm.setFieldValue('address.city.id', addressValidate.city.id);
    } else if (
      addressValidateLoading === false &&
      formikForm.setFieldValue &&
      typeof addressValidate === 'undefined'
    ) {
      formikForm.setFieldValue('address.street', '');
      formikForm.setFieldValue('address.district', '');
      formikForm.setFieldValue('address.city.id', '');
    }
  }, [addressValidate]);

  const onCepChange = form => event => {
    const fieldValue = event.target.value;
    setFormikForm(form);

    if (fieldValue.indexOf('_') < 0 && fieldValue.length === 9) {
      dispatch(
        AddressCreators.getAddressValidateRequest({ code_post: fieldValue }),
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
      validateOnBlur
      enableReinitialize
      render={({ values, ...form }) => (
        <Form>
          <Card style={{ marginTop: 20 }}>
            <InputContainer>
              <InputItem>
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="INFORMAÇÕES BÁSICAS" />
                  {/*
                  <Tab label="DESCRIÇÕES" />
                  */}
                  <Tab label="ENDEREÇO" />
                </Tabs>
                {value === 0 && (
                  <TabContainer>
                    <Typography variant="h6">Informações Básicas</Typography>
                    <InputContainer>
                      <InputItem>
                        <FastField
                          name="name"
                          label="Nome"
                          component={CustomTextField}
                        />
                      </InputItem>
                      <InputItem>
                        <Field
                          name="email"
                          label="E-mail"
                          component={CustomTextField}
                        />
                      </InputItem>
                    </InputContainer>
                    <InputContainer>
                      <InputItem>
                        <FastField
                          name="genre"
                          label="Gênero"
                          options={[
                            { id: 'M', name: 'Masculino' },
                            { id: 'F', name: 'Feminino' },
                          ]}
                          component={CustomSelect}
                          placeholder="Gênero"
                          isLoading={false}
                        />
                      </InputItem>
                      <InputItem>
                        <FastField
                          name="cell_phone"
                          label="Telefone"
                          component={CustomMaskField}
                          mask="(99) 99999-9999"
                        />
                      </InputItem>
                    </InputContainer>
                    <InputContainer>
                      <InputItem>
                        <FastField
                          name="birth_date"
                          label="Data de Nascimento"
                          component={CustomInputDate}
                        />
                      </InputItem>
                      <InputItem>
                        <FastField
                          name="cpf"
                          label="CPF"
                          component={CustomMaskField}
                          mask="999.999.999-99"
                        />
                      </InputItem>
                    </InputContainer>
                    <InputContainer>
                      <InputItem>
                        <Field
                          name="store.id"
                          label="Loja"
                          options={storeList}
                          component={CustomSelect}
                          placeholder="Loja"
                          isLoading={storeListLoading}
                        />
                      </InputItem>
                      <InputItem>
                        <Field
                          name="group.id"
                          label="Grupo"
                          options={groupList}
                          component={CustomSelect}
                          placeholder="Grupo"
                          isLoading={groupListLoading}
                        />
                      </InputItem>
                    </InputContainer>
                    <Typography variant="h6">Segurança</Typography>
                    <InputContainer>
                      <InputItem>
                        <FastField
                          name="password"
                          label="Senha"
                          type="password"
                          component={CustomTextField}
                        />
                      </InputItem>
                      <InputItem>
                        <FastField
                          name="password_confirm"
                          label="Confirmação da senha"
                          type="password"
                          component={CustomTextField}
                        />
                      </InputItem>
                    </InputContainer>
                    <InputItem>
                      <FastField
                        name="image"
                        label="Foto de perfil"
                        component={CustomImageField}
                        previewUrl={
                          values.image_info && values.image_info.small
                            ? values.image_info.small
                            : ''
                        }
                      />
                    </InputItem>
                  </TabContainer>
                )}
                {/*
                {value === 1 && (
                  <TabContainer>
                    <InputContainer>
                      <InputItem style={{ width: '50%' }}>
                        <FastField
                          name="description"
                          label="Descrição"
                          component={CustomRichText}
                        />
                      </InputItem>
                    </InputContainer>
                  </TabContainer>
                )} */}
                {value === 1 && (
                  <TabContainer>
                    <InputContainer>
                      <InputItem>
                        <FastField
                          name="address.code_post"
                          label="CEP"
                          component={CustomMaskField}
                          mask="99999-999"
                          onKeyUp={onCepChange(form)}
                        />
                      </InputItem>
                      <InputItem>
                        <FastField
                          name="address.street"
                          label="Logradouro"
                          component={CustomTextField}
                        />
                      </InputItem>
                    </InputContainer>
                    <InputContainer>
                      <InputItem>
                        <FastField
                          name="address.number"
                          label="Número"
                          type="number"
                          component={CustomTextField}
                        />
                      </InputItem>
                      <InputItem>
                        <FastField
                          name="address.complement"
                          label="Complemento"
                          component={CustomTextField}
                        />
                      </InputItem>
                    </InputContainer>
                    <InputContainer>
                      <InputItem>
                        <FastField
                          name="address.district"
                          label="Bairro"
                          component={CustomTextField}
                        />
                      </InputItem>
                      <InputItem style={{ pointerEvents: 'none' }}>
                        <Field
                          name="address.city.id"
                          label="Cidade"
                          options={formatCityName(cityList)}
                          component={CustomSelect}
                          placeholder="Cidade"
                          isLoading={cityListLoading}
                        />
                      </InputItem>
                    </InputContainer>
                  </TabContainer>
                )}
              </InputItem>
            </InputContainer>
            <FormButtons
              handleBack={handleBack}
              isLoading={isLoading}
              submitText={submitText}
            />
          </Card>
        </Form>
      )}
    />
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  isLoading: PropTypes.bool.isRequired,
};

UserForm.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBack: false,
  onSubmit: () => { },
};

export default UserForm;
