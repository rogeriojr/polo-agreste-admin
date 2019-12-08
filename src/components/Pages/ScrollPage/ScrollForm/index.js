import React from 'react';
import { Formik, Field, Form, FastField } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import CustomTextField from 'components/form/components/CustomTextField';
import FormButtons from 'components/form/components/FormButtons';
import CustomSelect from 'components/form/components/CustomSelect';
import CustomImageField from 'components/form/components/CustomImageField';
import validators from 'utils/validators';
import CustomRichText from 'components/form/components/CustomRichText';

export const formInitialValues = {
  id: '',
  name: '',
  description: '',
  route_app: '',
  order_position: '',
  status: 1,
  image: '',
  image_data: '',
  image_info: '',
};

const schema = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().required('Este campo é obrigatório'),
  description: Yup.string(),
  order_position: Yup.string().test(...validators.numberNotRequired()),
  route_app: Yup.string().required('Este campo é obrigatório'),
  status: Yup.number().required('Este campo é obrigatório'),
});

const ScrollForm = ({
  onSubmit,
  initialValues = formInitialValues,
  submitText,
  handleBack,
  isLoading,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
      validateOnBlur
      enableReinitialize
      render={({ values }) => (
        <Form>
          <Card style={{ padding: 20 }}>
            <InputContainer>
              <InputItem>
                <Field name="name" label="Nome" component={CustomTextField} />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <Field name="route_app" label="Rota" component={CustomTextField} />
              </InputItem>
              <InputItem>
                <Field
                  name="order_position"
                  label="Ordem"
                  type="number"
                  component={CustomTextField}
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
              <InputItem style={{ width: '50%' }}>
                <FastField
                  name="description"
                  label="Descrição"
                  component={CustomRichText}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <Field
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

ScrollForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  isLoading: PropTypes.bool.isRequired,
};

ScrollForm.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBack: false,
  onSubmit: () => {},
};

export default ScrollForm;
