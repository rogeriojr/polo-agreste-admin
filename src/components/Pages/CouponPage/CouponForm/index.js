import React from 'react';
import { Formik, Field, Form, FastField } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import CustomTextField from 'components/form/components/CustomTextField';
import FormButtons from 'components/form/components/FormButtons';
import CustomDateRange from 'components/form/components/CustomDateRange';
import CustomSelect from 'components/form/components/CustomSelect';
import CustomCurrencyField from 'components/form/components/CustomCurrencyField';
import styled from 'styled-components';

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
  code: '',
  date_start: '',
  date_end: '',
  type_discount: 1,
  price_discount: '',
  price_min: '',
  price_max: '',
  quantity: '',
  quantity_client: '',
  status: 1,
};

const schema = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().required('Este campo é obrigatório'),
  code: Yup.string().required('Este campo é obrigatório'),
  date_start: Yup.string().required('Este campo é obrigatório'),
  date_end: Yup.string().required('Este campo é obrigatório'),
  type_discount: Yup.string().required('Este campo é obrigatório'),
  price_discount: Yup.string().required('Este campo é obrigatório'),
  price_min: Yup.string(),
  price_max: Yup.string(),
  quantity: Yup.number().required('Este campo é obrigatório'),
  quantity_client: Yup.number().required('Este campo é obrigatório'),
  status: Yup.number().required('Este campo é obrigatório'),
});

const NameInputItem = styled(InputItem)`
  min-width: calc(100% - 326px);
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const CouponForm = ({
  onSubmit,
  initialValues = formInitialValues,
  submitText,
  handleBack,
  isLoading,
  freezeCode,
}) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
      validateOnBlur
      enableReinitialize
      render={({ values }) => (
        <Form>
          <Card style={{ padding: 20, minHeight: 400 }}>
            <InputContainer>
              <NameInputItem>
                <Field name="name" label="Nome" component={CustomTextField} />
              </NameInputItem>
              <InputItem>
                <Field
                  name="dateStartEnd"
                  component={CustomDateRange}
                  dateStartField="date_start"
                  dateEndField="date_end"
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <Field
                  name="code"
                  label="Código"
                  component={CustomTextField}
                  disabled={freezeCode}
                />
              </InputItem>
              <InputItem>
                <Field
                  name="status"
                  label="Status"
                  options={[
                    { id: 0, name: 'Inativo' },
                    { id: 1, name: 'Ativo' },
                  ]}
                  component={CustomSelect}
                  placeholder="Status"
                  isLoading={false}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <Field
                  name="type_discount"
                  label="Tipo de desconto"
                  options={[
                    { id: 1, name: 'Preço' },
                    { id: 2, name: 'Porcentagem' },
                  ]}
                  component={CustomSelect}
                  placeholder="Tipo de desconto"
                  isLoading={false}
                />
              </InputItem>
              {values.type_discount === 1 && (
                <InputItem>
                  <Field
                    name="price_discount"
                    label="Valor do desconto"
                    component={CustomCurrencyField}
                  />
                </InputItem>
              )}
              {values.type_discount === 2 && (
                <InputItem>
                  <Field
                    name="price_discount"
                    label="Porcentagem do desconto"
                    component={CustomTextField}
                    type="number"
                    min={0}
                    max={100}
                  />
                </InputItem>
              )}
            </InputContainer>
            <InputContainer>
              <InputItem>
                <Field
                  name="price_min"
                  label="Valor Mínimo"
                  component={CustomCurrencyField}
                />
              </InputItem>
              <InputItem>
                <Field
                  name="price_max"
                  label="Valor Máximo"
                  component={CustomCurrencyField}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <Field
                  name="quantity"
                  label="Quantidade de cupons"
                  component={CustomTextField}
                />
                <span style={{ fontSize: 12, marginLeft: 10 }}>
                  0 = Uso Ilimitado
                </span>
              </InputItem>
              <InputItem>
                <Field
                  name="quantity_client"
                  label="Limite por cliente"
                  component={CustomTextField}
                />
                <span style={{ fontSize: 12, marginLeft: 10 }}>
                  0 = Uso Ilimitado
                </span>
              </InputItem>
            </InputContainer>
            <FormButtons
              handleBack={handleBack}
              submitText={submitText}
              isLoading={isLoading}
            />
          </Card>
        </Form>
      )}
    />
  );
};

CouponForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  isLoading: PropTypes.bool.isRequired,
  freezeCode: PropTypes.bool,
};

CouponForm.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBack: false,
  onSubmit: () => {},
  freezeCode: false,
};

export default CouponForm;
