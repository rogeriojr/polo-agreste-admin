import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import FormButtons from 'components/form/components/FormButtons';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import { FastField, Formik, Form } from 'formik';
import CustomSelect from 'components/form/components/CustomSelect';
import CustomTextField from 'components/form/components/CustomTextField';

export const formInitialValues = {
  status:'',
  frequency:'',
  link_xml: '',
};

const schema = Yup.object().shape({
  status: Yup.number(),
  frequency: Yup.number(),
  link_xml: Yup.string().required('Campo obrigatório'),
});

const ProductImportConfig = ({
  initialValues = formInitialValues,
  handleBackLabel,
  onSubmit,
  handleBack,
  submitText,
}) => {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
        validateOnBlur
        render={({ values }) => (
          <Form>
            <InputContainer>
              <InputItem>
                <FastField
                  name="status"
                  label="Status"
                  options={[
                    { name: 'Ativo', id: 0 },
                    { name: 'Inativo', id: 1 },
                  ]}
                  component={CustomSelect}
                  placeholder="Status"
                  isLoading={false}
                />
              </InputItem>
              <InputItem>
                <FastField
                  name="frequency"
                  label="Frequência"
                  options={[
                    { name: '1 vez ao dia', id: 0 },
                    { name: '2 vezes ao dia', id: 1 },
                  ]}
                  component={CustomSelect}
                  placeholder="Frequência"
                  isLoading={false}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <FastField
                  name="link_xml"
                  label="Link do XML Ex: https://exemplo.com.br"
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
            <FormButtons submitText={submitText} handleBack={handleBack} handleBackLabel={handleBackLabel} type="submit" />
          </Form>
        )}
      />
    </>
  );
};

ProductImportConfig.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  handleBackLabel: PropTypes.string,
  onSubmit: PropTypes.oneOfType([PropTypes.func]),
};

ProductImportConfig.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBackLabel: 'Limpar',
  onSubmit: () => {},
};

export default ProductImportConfig;
