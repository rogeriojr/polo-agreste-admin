import React, { useRef } from 'react';
import { Formik, FastField, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Card, Typography, Input, Icon } from '@material-ui/core';
import { Tab, Tabs } from 'components/Layout/Tabs';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import CustomTextField from 'components/form/components/CustomTextField';
import CustomSelect from 'components/form/components/CustomSelect';
import FormButtons from 'components/form/components/FormButtons';
import CustomRichText from 'components/form/components/CustomRichText';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as BankCreators } from 'store/ducks/bank';
import { Creators as AddressCreators } from 'store/ducks/address';
import CustomMaskField from 'components/form/components/CustomMaskField';
import { validateBr } from 'js-brasil';
import validators from 'utils/validators';
import CustomInputDate from 'components/form/components/CustomInputDate';
import CustomImageField from 'components/form/components/CustomImageField';
import { formatCityName, formatBankName } from 'utils/converters';
import StoreUsersList from 'components/Pages/StorePage/StoreUsersList';

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
  email: '',
  description: '',
  cnpj: '',
  social_name: '',
  quantity_min_whole: '',
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
  manager: {
    name: '',
    father_name: '',
    mother_name: '',
    email: '',
    cpf: '',
    rg_number: '',
    rg_issuer: '',
    rg_issuer_date: '',
    cell_phone: '',
    birth_date: '',
    code_post: '',
    street: '',
    number: '',
    district: '',
    complement: '',
    city: {
      id: '',
    },
  },
  bank: {
    bank: {
      id: '',
    },
    agency: '',
    agency_check: '',
    account: '',
    account_check: '',
    type: '',
    doc_type: 'CPF',
    doc_number: '',
    account_holder: '',
  },
};

const schema = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('Campo obrigatório'),
  // description: Yup.string(),
  cnpj: Yup.string()
    .test('cnpj', 'CNPJ inválido', val =>
      val === undefined ? false : validateBr.cnpj(val),
    )
    .required('Obrigatório'),
  social_name: Yup.string().required('Campo obrigatório'),
  quantity_min_whole: Yup.string(),
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
    complement: Yup.string(),
    city: Yup.object().shape({
      id: Yup.string()
        .test(...validators.numberNotRequired())
        .required('Campo obrigatório'),
    }),
  }),
  manager: Yup.object().shape({
    name: Yup.string().required('Este campo é obrigatório'),
    email: Yup.string()
      .email('E-mail inválido')
      .required('Campo obrigatório'),
    cpf: Yup.string()
      .test(...validators.cpfInvalid('CPF inválido'))
      .required('Obrigatório'),
    cell_phone: Yup.string().required('Campo obrigatório'),
    birth_date: Yup.string().required('Campo obrigatório'),
    code_post: Yup.string()
      .test('cep', 'CEP inválido', val =>
        val === undefined ? false : validateBr.cep(val),
      )
      .required('Campo obrigatório'),
    street: Yup.string().required('Campo obrigatório'),
    number: Yup.string().required('Campo obrigatório'),
    district: Yup.string().required('Campo obrigatório'),
    complement: Yup.string(),
    city: Yup.object().shape({
      id: Yup.string()
        .test(...validators.numberNotRequired())
        .required('Campo obrigatório'),
    }),
    image: '',
    image_data: '',
    image_info: '',
  }),
  bank: Yup.object().shape({
    bank: Yup.object().shape({
      id: Yup.string().test(...validators.numberNotRequired()),
    }),
    agency: Yup.string().test(...validators.numberNotRequired()),
    agency_check: Yup.string().test(
      ...validators.numberNotRequired('Apenas numeros'),
    ),
    account: Yup.string().test(...validators.numberNotRequired()),
    account_check: Yup.string().test(...validators.numberNotRequired()),
    type: Yup.string(),
    doc_type: Yup.string(),
    doc_number: Yup.string(),
    account_holder: Yup.string(),
  }),
});

const StoreForm = ({
  onSubmit,
  initialValues = formInitialValues,
  submitText,
  handleBack,
  isLoading,
}) => {
  const dispatch = useDispatch();

  const cepTypes = {
    STORE: 0,
    MANAGER: 1,
  };

  const [value, setValue] = React.useState(0);

  const [cepType, setCepType] = React.useState(cepTypes.STORE);

  const [formikForm, setFormikForm] = React.useState({});

  const [cityStoreInfo, setCityStoreInfo] = React.useState({
    cityList: [],
    cityListLoading: true,
  });

  const [cityManagerInfo, setCityManagerInfo] = React.useState({
    cityList: [],
    cityListLoading: true,
  });

  const formikRef = useRef();

  React.useEffect(() => {
    setFormikForm(formikRef.current);
  }, [formikRef]);

  const { bankList, bankListLoading } = useSelector(state => state.bank);
  const { addressValidate, addressValidateLoading } = useSelector(
    state => state.address,
  );

  const getInitialData = () => {
    dispatch(BankCreators.getBankListRequest({ perPage: 1000 }));
    if (initialValues.address && initialValues.address.code_post) {
      dispatch(
        AddressCreators.getAddressValidateRequest({
          code_post: initialValues.address.code_post,
        }),
      );
    } else {
      setCityStoreInfo({
        cityList: [],
        cityListLoading: false,
      });
    }

    if (!initialValues.manager || !initialValues.manager.code_post) {
      setCityManagerInfo({
        cityList: [],
        cityListLoading: false,
      });
    }
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

        setCityStoreInfo({
          cityList: [
            {
              ...addressValidate.city,
            },
          ],
          cityListLoading: false,
        });

        if (
          initialValues.manager &&
          initialValues.manager.code_post &&
          cityManagerInfo.cityList.length === 0
        ) {
          setCepType(cepTypes.MANAGER);
          dispatch(
            AddressCreators.getAddressValidateRequest({
              code_post: initialValues.manager.code_post,
            }),
          );
        }
      } else if (cepType === cepTypes.MANAGER) {
        formikForm.setFieldValue('manager.street', addressValidate.street);
        formikForm.setFieldValue('manager.district', addressValidate.district);
        formikForm.setFieldValue('manager.city.id', addressValidate.city.id);

        setCityManagerInfo({
          cityList: [
            {
              ...addressValidate.city,
            },
          ],
          cityListLoading: false,
        });
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
        setCityStoreInfo({
          cityList: [],
          cityListLoading: false,
        });
      } else if (cepType === cepTypes.MANAGER) {
        formikForm.setFieldValue('manager.street', '');
        formikForm.setFieldValue('manager.district', '');
        formikForm.setFieldValue('manager.city.id', '');
        setCityManagerInfo({
          cityList: [],
          cityListLoading: false,
        });
      }
    }
  }, [addressValidate]);

  const onCepChange = curCepType => event => {
    const fieldValue = event.target.value;

    setCepType(curCepType);

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
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
      enableReinitialize
      ref={formikRef}
      render={({ values, ...form }) => (
        <Form>
          <Card style={{ marginTop: 20 }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="LOJA" icon={<Icon>store_mall_directory</Icon>} />
              <Tab label="LISTA DE USUÁRIOS" icon={<Icon>people_alt</Icon>} />
              <Tab
                label="INFORMAÇÕES BANCÁRIAS"
                icon={<Icon>attach_money</Icon>}
              />
              <Tab label="QUEM SOMOS " icon={<Icon>text_format</Icon>} />
            </Tabs>
            {value === 0 && (
            <TabContainer>
              <InputContainer>
                <InputItem>
                  <Typography variant="h6">Dados Básico</Typography>
                </InputItem>
              </InputContainer>
              <InputContainer></InputContainer>
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
                    name="email"
                    label="E-mail"
                    component={CustomTextField}
                  />
                </InputItem>
              </InputContainer>
              <InputContainer>
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
              <InputContainer>
                <InputItem>
                  <Typography variant="h6">Endereço</Typography>
                </InputItem>
              </InputContainer>
              <InputContainer>
                <InputItem>
                  <FastField
                    name="address.code_post"
                    label="CEP"
                    component={CustomMaskField}
                    mask="99999-999"
                    onKeyUp={onCepChange(cepTypes.STORE)}
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
                    options={formatCityName(cityStoreInfo.cityList)}
                    component={CustomSelect}
                    placeholder="Cidade"
                    isLoading={cityStoreInfo.cityListLoading}
                  />
                </InputItem>
              </InputContainer>
              <InputContainer>
                <InputItem>
                  <Typography variant="h6">Configurações de atacado</Typography>
                </InputItem>
              </InputContainer>
                <InputItem>
                  <FastField
                    name="quantity_min_whole"
                    label="Quantidade mínima para atacado da loja"
                    type="number"
                    component={CustomTextField}
                  />
                </InputItem>
                <InputItem>
                  <Typography variant="p" style={{ color: '#ce4899' }}>
                    Caso o campo esteja vazio ou zerado, os produtos
                    serão vendidos exclusivamente
                    em varejo
                  </Typography>
                </InputItem>
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
                <StoreUsersList />
              </TabContainer>
            )}
            {value === 2 && (
              <TabContainer>
                <InputContainer>
                  <InputItem>
                    <Field
                      name="bank.bank.id"
                      label="Banco"
                      options={formatBankName(bankList)}
                      component={CustomSelect}
                      placeholder="Banco"
                      isLoading={bankListLoading}
                    />
                  </InputItem>
                  <InputItem>
                    <FastField
                      name="bank.agency"
                      label="Número da agência"
                      type="number"
                      component={CustomTextField}
                    />
                  </InputItem>
                  <InputItem>
                    <FastField
                      name="bank.agency_check"
                      label="Dígito da agência"
                      // type="number"
                      component={CustomTextField}
                    />
                  </InputItem>
                </InputContainer>
                <InputContainer>
                  <InputItem>
                    <FastField
                      name="bank.account"
                      label="Número da Conta"
                      type="number"
                      component={CustomTextField}
                    />
                  </InputItem>
                  <InputItem>
                    <FastField
                      name="bank.account_check"
                      label="Dígito da Conta"
                      type="number"
                      component={CustomTextField}
                    />
                  </InputItem>
                  <InputItem>
                    <FastField
                      name="bank.type"
                      label="Tipo de conta"
                      options={[
                        { id: 'Corrente', name: 'Corrente' },
                        { id: 'Poupança', name: 'Poupança' },
                      ]}
                      component={CustomSelect}
                      placeholder="Tipo de conta"
                      isLoading={false}
                    />
                  </InputItem>
                </InputContainer>
                <InputContainer>
                  <InputItem>
                    <FastField
                      name="bank.account_holder"
                      label="Titular da conta"
                      component={CustomTextField}
                    />
                  </InputItem>
                </InputContainer>
                <InputContainer>
                  <InputItem>
                    <FastField
                      name="bank.doc_type"
                      label="Tipo de conta"
                      options={[
                        { id: 'CPF', name: 'CPF' },
                        { id: 'CNPJ', name: 'CNPJ' },
                      ]}
                      placeholder="Tipo de conta"
                      component={CustomSelect}
                      isLoading={false}
                    />
                  </InputItem>
                  <InputItem>
                    <Field
                      name="bank.doc_number"
                      label="Número do documento"
                      component={CustomMaskField}
                      mask={
                        values.bank.doc_type === 'CPF'
                          ? '999.999.999-99'
                          : '99.999.999/9999-99'
                      }
                    />
                  </InputItem>
                </InputContainer>
              </TabContainer>
            )}
            {value === 3 && (
              <TabContainer>
                <InputContainer>
                  <InputItem style={{ width: '50%' }}>
                    <Field
                      name="description"
                      label="Descrição"
                      component={CustomRichText}
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

StoreForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  isLoading: PropTypes.bool.isRequired,
  stateImages: PropTypes.any.isRequired,
  setStateImages: PropTypes.func.isRequired,
};

StoreForm.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBack: false,
  onSubmit: () => { },
};

export default StoreForm;
