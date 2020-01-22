import React from 'react';
import { Formik, FastField, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Card, Typography, Icon } from '@material-ui/core';
import { Tab, Tabs } from 'components/Layout/Tabs';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import CustomTextField from 'components/form/components/CustomTextField';
import CustomSelect from 'components/form/components/CustomSelect';
import FormButtons from 'components/form/components/FormButtons';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CityCreators } from 'store/ducks/city';
import { Creators as BankCreators } from 'store/ducks/bank';
import { Creators as AddressCreators } from 'store/ducks/address';
import CustomMaskField from 'components/form/components/CustomMaskField';
import { validateBr } from 'js-brasil';
import validators from 'utils/validators';
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
  name: '',
  description: '',
  cnpj: '',
  social_name: '',
  state_register: '',
  cell_phone: '',
  cnae: '',
  segment: '',
  website: '',
  status: 0,
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
  shopping_global: {
    email_name: '',
    email_smtp: '',
    email_stock: '',
    email_commercial: '',
    email_financial: '',
    email_support: '',
    rate_markup: '',
    rate_shopping: '',
    rate_financial: '',
    rate_reseller: '',
  },
};

const schema = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().required('Campo obrigatório'),
  // description: Yup.string(),
  cnpj: Yup.string()
    .test('cnpj', 'CNPJ inválido', val =>
      val === undefined ? false : validateBr.cnpj(val),
    )
    .required('Obrigatório'),
  social_name: Yup.string().required('Campo obrigatório'),
  state_register: Yup.string(),
  cell_phone: Yup.string().required('Campo obrigatório'),
  cnae: Yup.string(),
  website: Yup.string(),
  status: Yup.number().required('Campo obrigatório'),
  address: Yup.object().shape({
    code_post: Yup.string()
      .test('cep', 'CEP inválido', val =>
        val === undefined ? false : validateBr.cep(val),
      )
      .required('Campo obrigatório'),
    street: Yup.string().required('Campo obrigatório'),
    number: Yup.string().required('Campo obrigatório'),
    district: Yup.string().required('Campo obrigatório'),
    complement: Yup.string().required('Campo obrigatório'),
    city: Yup.object().shape({
      id: Yup.string()
        .test(...validators.numberNotRequired())
        .required('Campo obrigatório'),
    }),
  }),
  shopping_global: Yup.object().shape({
    email_name: Yup.string()
      .email('E-mail inválido')
      .required('Campo obrigatório'),
    email_smtp: Yup.string()
      .email('E-mail inválido')
      .required('Campo obrigatório'),
    email_stock: Yup.string()
      .email('E-mail inválido')
      .required('Campo obrigatório'),
    email_commercial: Yup.string()
      .email('E-mail inválido')
      .required('Campo obrigatório'),
    email_financial: Yup.string()
      .email('E-mail inválido')
      .required('Campo obrigatório'),
    email_support: Yup.string()
      .email('E-mail inválido')
      .required('Campo obrigatório'),
    rate_markup: Yup.string().nullable(),
    rate_shopping: Yup.string().nullable(),
    rate_financial: Yup.string().nullable(),
    rate_reseller: Yup.string().nullable(),
  }),
});

const ShoppingForm = ({
  onSubmit,
  initialValues = formInitialValues,
  submitText,
  handleBack,
  isLoading,
}) => {
  const realInitialValues = {
    ...formInitialValues,
    ...initialValues,
  };
  const dispatch = useDispatch();

  const cepTypes = {
    STORE: 0,
    MANAGER: 0,
  };

  const [value, setValue] = React.useState(0);

  const [cepType, setCepType] = React.useState(cepTypes.STORE);

  const [formikForm, setFormikForm] = React.useState({});

  const { cityList, cityListLoading } = useSelector(state => state.city);
  const { addressValidate, addressValidateLoading } = useSelector(
    state => state.address,
  );

  const getInitialData = () => {
    dispatch(CityCreators.getCityListRequest({ perPage: 10000 }));
    dispatch(BankCreators.getBankListRequest({ perPage: 1000 }));
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    if (
      addressValidateLoading === false &&
      formikForm.setFieldValue &&
      addressValidate
    ) {
      if (cepType === cepTypes.STORE) {
        formikForm.setFieldValue('address.street', addressValidate.street);
        formikForm.setFieldValue('address.district', addressValidate.district);
        formikForm.setFieldValue('address.city.id', addressValidate.city.id);
      } else if (cepType === cepTypes.MANAGER) {
        formikForm.setFieldValue('manager.street', addressValidate.street);
        formikForm.setFieldValue('manager.district', addressValidate.district);
        formikForm.setFieldValue('manager.city.id', addressValidate.city.id);
      }
    } else if (
      addressValidateLoading === false &&
      formikForm.setFieldValue &&
      typeof addressValidate === 'undefined'
    ) {
      if (cepType === cepTypes.STORE) {
        formikForm.setFieldValue('address.street', '');
        formikForm.setFieldValue('address.district', '');
        formikForm.setFieldValue('address.city.id', '');
      } else if (cepType === cepTypes.MANAGER) {
        formikForm.setFieldValue('manager.street', '');
        formikForm.setFieldValue('manager.district', '');
        formikForm.setFieldValue('manager.city.id', '');
      }
    }
  }, [addressValidate]);

  const onCepChange = (form, curCepType) => event => {
    const fieldValue = event.target.value;

    setCepType(curCepType);
    setFormikForm(form);

    if (fieldValue.indexOf('_') < 0 && fieldValue.length === 9) {
      dispatch(
        AddressCreators.getAddressValidateRequest({ code_post: fieldValue }),
      );
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Formik
      initialValues={realInitialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
      enableReinitialize
      render={({ values, ...form }) => (
        <Form>
          <Card style={{ marginTop: 20 }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="SHOPPING" icon={<Icon>store_mall_directory</Icon>} />
              <Tab label="CONFIGURAÇÕES GERAIS" icon={<Icon>settings</Icon>} />
            </Tabs>
            {value === 0 && (
              <TabContainer>
                <Typography variant="h6">Dados Básico</Typography>
                <InputContainer>
                  <InputItem>
                    <FastField
                      name="name"
                      label="Nome da loja"
                      component={CustomTextField}
                    />
                  </InputItem>
                </InputContainer>
                <InputContainer>
                  <InputItem>
                    <FastField
                      name="social_name"
                      label="Razão Social"
                      component={CustomTextField}
                    />
                  </InputItem>
                  <InputItem>
                    <FastField
                      name="cell_phone"
                      label="Telefone"
                      mask="(99) 99999-9999"
                      component={CustomMaskField}
                    />
                  </InputItem>
                </InputContainer>
                <InputContainer>
                  <InputItem>
                    <FastField
                      name="cnpj"
                      label="CNPJ"
                      mask="99.999.999/9999-99"
                      component={CustomMaskField}
                    />
                  </InputItem>
                  <InputItem>
                    <FastField
                      name="state_register"
                      label="Inscrição Estadual"
                      component={CustomTextField}
                    />
                  </InputItem>
                </InputContainer>
                <InputContainer>
                  <InputItem>
                    <FastField
                      name="cnae"
                      label="CNAE"
                      component={CustomTextField}
                    />
                  </InputItem>
                  <InputItem>
                    <FastField
                      name="website"
                      label="Website"
                      component={CustomTextField}
                    />
                  </InputItem>
                  <InputItem>
                    <FastField
                      name="status"
                      label="Status"
                      options={[
                        { id: 0, name: 'Aguardando aprovação' },
                        { id: 1, name: 'Ativo' },
                        { id: 2, name: 'Bloqueado' },
                      ]}
                      component={CustomSelect}
                      placeholder="Status"
                      isLoading={false}
                    />
                  </InputItem>
                </InputContainer>
                <Typography variant="h6">Endereço</Typography>
                <InputContainer>
                  <InputItem>
                    <FastField
                      name="address.code_post"
                      label="CEP"
                      component={CustomMaskField}
                      mask="99999-999"
                      onKeyUp={onCepChange(form, cepTypes.STORE)}
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
                <InputContainer>
                  <InputItem>
                    <FastField
                      name="image"
                      label="Imagem"
                      component={CustomImageField}
                      previewUrl={
                        values.image_info && values.image_info.small
                          ? values.image_info.small
                          : ''
                      }
                    />
                  </InputItem>
                </InputContainer>
              </TabContainer>
            )}
            {value === 1 && (
              <TabContainer>
                <Typography variant="h6">E-mails</Typography>
                <InputContainer>
                  <InputItem>
                    <FastField
                      name="shopping_global.email_name"
                      label="E-mail padrão"
                      component={CustomTextField}
                    />
                  </InputItem>
                  <InputItem>
                    <FastField
                      name="shopping_global.email_smtp"
                      label="E-mail SMTP"
                      component={CustomTextField}
                    />
                  </InputItem>
                </InputContainer>
                <InputContainer>
                  <InputItem>
                    <FastField
                      name="shopping_global.email_stock"
                      label="E-mail de estoque"
                      component={CustomTextField}
                    />
                  </InputItem>
                  <InputItem>
                    <FastField
                      name="shopping_global.email_commercial"
                      label="E-mail Comercial"
                      component={CustomTextField}
                    />
                  </InputItem>
                </InputContainer>
                <InputContainer>
                  <InputItem>
                    <FastField
                      name="shopping_global.email_financial"
                      label="E-mail Financeiro"
                      component={CustomTextField}
                    />
                  </InputItem>
                  <InputItem>
                    <FastField
                      name="shopping_global.email_support"
                      label="E-mail de Suporte"
                      component={CustomTextField}
                    />
                  </InputItem>
                </InputContainer>
                <Typography variant="h6">Taxas</Typography>
                <InputContainer>
                  <InputItem>
                    <Field
                      name="shopping_global.rate_markup"
                      label="Taxa de Markup"
                      component={CustomTextField}
                      type="number"
                      min={0}
                      max={100}
                    />
                  </InputItem>
                  <InputItem>
                    <Field
                      name="shopping_global.rate_shopping"
                      label="Taxa do Shopping"
                      component={CustomTextField}
                      type="number"
                      min={0}
                      max={100}
                    />
                  </InputItem>
                  <InputItem>
                    <Field
                      name="shopping_global.rate_financial"
                      label="Taxa da Financeira"
                      component={CustomTextField}
                      type="number"
                      min={0}
                      max={100}
                    />
                  </InputItem>
                  <InputItem>
                    <Field
                      name="shopping_global.rate_reseller"
                      label="Taxa do Vendedor"
                      component={CustomTextField}
                      type="number"
                      min={0}
                      max={100}
                    />
                  </InputItem>
                </InputContainer>
              </TabContainer>
            )}
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

ShoppingForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  isLoading: PropTypes.bool.isRequired,
};

ShoppingForm.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBack: false,
  onSubmit: () => {},
};

export default ShoppingForm;
