import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import CustomTextField from 'components/form/components/CustomTextField';
import FormButtons from 'components/form/components/FormButtons';
import CustomRichText from 'components/form/components/CustomRichText';

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
};

const schema = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().required('Este campo é obrigatório'),
  description: Yup.string().required('Este campo é obrigatório'),
});

const PageForm = ({
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
      render={() => (
        <Form>
          <Card style={{ padding: 20 }}>
            <InputContainer>
              <InputItem style={{ width: '50%' }}>
                <Field name="name" label="Nome" component={CustomTextField} />
              </InputItem>
            </InputContainer>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <InputContainer>
              <InputItem>
                <InputContainer>
                  <InputItem style={{ width: '50%' }}>
                    <Field
                      name="description"
                      label="Descrição"
                      component={CustomRichText}
                    />
                  </InputItem>
                </InputContainer>
              </InputItem>
            </InputContainer>
            <FormButtons handleBack={handleBack} submitText={submitText} />
          </Card>
        </Form>
      )}
    />
  );
};

PageForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

PageForm.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBack: false,
  onSubmit: () => {},
};

export default PageForm;
