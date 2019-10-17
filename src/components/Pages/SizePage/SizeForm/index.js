import React from 'react';
import { Formik, Field, Form, FastField } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import CustomTextField from 'components/form/components/CustomTextField';
import FormButtons from 'components/form/components/FormButtons';
import CustomRichText from 'components/form/components/CustomRichText';
import CustomSelect from 'components/form/components/CustomSelect';

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
  order_position: '',
  hexa: '#000000',
  code: '',
  name: '',
  status: 1,
};

const schema = Yup.object().shape({
  id: Yup.number(),
  order_position: Yup.number().required('Este campo é obrigatório'),
  code: Yup.string(),
  name: Yup.string().required('Este campo é obrigatório'),
  status: Yup.number().required('Este campo é obrigatório'),
});

const SizeForm = ({
  onSubmit,
  initialValues = formInitialValues,
  submitText,
  handleBack,
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
      render={() => (
        <Form>
          <Card style={{ padding: 20 }}>
            <InputContainer>
              <InputItem style={{ flexGrow: 2 }}>
                <Field name="name" label="Nome" component={CustomTextField} />
              </InputItem>
              <InputItem style={{ flexGrow: 2 }}>
                <Field name="code" label="Código" component={CustomTextField} />
              </InputItem>
              <InputItem>
                <Field
                  name="order_position"
                  label="Ordem"
                  type="number"
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
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
            <FormButtons handleBack={handleBack} submitText={submitText} />
          </Card>
        </Form>
      )}
    />
  );
};

SizeForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

SizeForm.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBack: false,
  onSubmit: () => {},
};

export default SizeForm;
