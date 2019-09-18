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
  id: '',
  name: '',
  description: '',
  order_position: '',
  category_father: {
    id: '',
  },
  image: '',
  image_data: '',
  image_info: '',
};

const schema = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().required('Este campo é obrigatório'),
  description: Yup.string().required('Este campo é obrigatório'),
  order_position: Yup.number().required('Este campo é obrigatório'),
  category_father: Yup.object().shape({
    id: Yup.number()
      .typeError('Este campo é obrigatório')
      .required(),
  }),
});

const CategoryForm = ({
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
      render={({ values }) => (
        <Form>
          <Card style={{ padding: 20 }}>
            <InputContainer>
              <InputItem flexGrow={4}>
                <Field name="name" label="Nome" component={CustomTextField} />
              </InputItem>
              <InputItem flexGrow={1}>
                <Field
                  name="order_position"
                  label="Ordem"
                  type="number"
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <InputContainer>
              <InputItem>
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="CATEGORIA PAI" icon={<Icon>category</Icon>} />
                  <Tab label="BANNER" icon={<Icon>image</Icon>} />
                </Tabs>
                {value === 0 && (
                  <TabContainer>
                    <InputContainer>
                      <InputItem style={{ width: '50%' }}>
                        <Field
                          name="category_father.id"
                          label="Categoria"
                          options={categoryList}
                          component={CustomSelect}
                          placeholder="Categoria pai"
                          isLoading={categoryListLoading}
                        />
                      </InputItem>
                    </InputContainer>
                  </TabContainer>
                )}
                {value === 1 && (
                  <TabContainer>
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
                    <InputContainer>
                      <InputItem style={{ width: '50%' }}>
                        <Field
                          name="description"
                          label="Categoria"
                          component={CustomRichText}
                        />
                      </InputItem>
                    </InputContainer>
                  </TabContainer>
                )}
              </InputItem>
            </InputContainer>
            <FormButtons
              isLoading={isLoading}
              handleBack={handleBack}
              submitText={submitText}
            />
          </Card>
        </Form>
      )}
    />
  );
};

CategoryForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  isLoading: PropTypes.bool.isRequired,
};

CategoryForm.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBack: false,
  onSubmit: () => {},
};

export default CategoryForm;
