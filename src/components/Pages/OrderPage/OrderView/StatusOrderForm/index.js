import React from 'react';
import { Formik, Field, Form, FastField } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Card, Typography, Icon } from '@material-ui/core';
import { Tab, Tabs } from 'components/Layout/Tabs';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import CustomTextField from 'components/form/components/CustomTextField';
import CustomImageField from 'components/form/components/CustomImageField';
import CustomSelect from 'components/form/components/CustomSelect';
import FormButtons from 'components/form/components/FormButtons';
import CustomRichText from 'components/form/components/CustomRichText';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CategoryCreators } from 'store/ducks/category';

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
  status: '',
};

const schema = Yup.object().shape({
  status: Yup.string().required('Escolha uma opção de status'),
});

const StatusOrderForm = ({
  onSubmit,
  initialValues = formInitialValues,
  submitText,
  handleBack,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const { categoryList, categoryListLoading } = useSelector(
    state => state.category,
  );

  const getInitialData = () =>
    dispatch(CategoryCreators.getCategoryListRequest({ perPage: 1000 }));

  React.useEffect(() => {
    getInitialData();
  }, []);

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
          <InputContainer style={{ alignItems: 'center' }}>
            <InputItem flexGrow={4}>
              <Field
                name="status"
                label="Status"
                options={[
                  { id: 0, name: 'Aguardando Pagamento' },
                  { id: 1, name: 'Pagamento Autorizado' },
                  { id: 2, name: 'Faturado Parcialmente' },
                  { id: 3, name: 'Faturado' },
                  { id: 4, name: 'Em Separação' },
                  { id: 5, name: 'Aguardando Envio' },
                  { id: 6, name: 'Enviado' },
                  { id: 7, name: 'Entregue / Concluído' },
                  { id: 8, name: 'Entregue Parcialmente' },
                  { id: 9, name: 'Aguardando Retirada' },
                  { id: 10, name: 'Devolvido' },
                  { id: 11, name: 'Devolvido Parcialmente' },
                  { id: 98, name: 'Não Autorizado / Pagamento Recusado' },
                  { id: 99, name: 'Cancelado' },
                ]}
                component={CustomSelect}
                placeholder="Status"
                isLoading={false}
              />
            </InputItem>
            <FormButtons
              isLoading={isLoading}
              handleBack={handleBack}
              submitText={submitText}
            />
          </InputContainer>
        </Form>
      )}
    />
  );
};

StatusOrderForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
};

StatusOrderForm.defaultProps = {
  initialValues: formInitialValues,
  onSubmit: () => { },
  submitText:'ENVIAR'
};

export default StatusOrderForm;
