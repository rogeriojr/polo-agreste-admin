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
import { Creators as ProductCreators } from 'store/ducks/product';
import { Creators as StoreCreators } from 'store/ducks/stores';
import VirtualCatalogPreview from 'components/Pages/VirtualCatalogPage/VirtualCatalogForm/VirtualCatalogPreview';

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
  categories: [],
  products: [],
  store: {},
  image: '',
  image_data: '',
  image_info: '',
};

const schema = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().required('Este campo é obrigatório'),
  store: Yup.object().shape({
    id: Yup.number().required('Este campo é obrigatório'),
  }),
  categories: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
    }),
  ),
  products: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
    }),
  ),
});

const VirtualCatalogForm = ({
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

  const { productList, productListLoading } = useSelector(
    state => state.product,
  );

  const { storeList, storeListLoading } = useSelector(state => state.store);
  
  const stateApp = useSelector(state => state.app);
  const jwtIdentity = stateApp.get('jwtIdentity');
  
  const getInitialData = () => {
    dispatch(CategoryCreators.getCategoryListRequest({ perPage: 1000 }));
    dispatch(ProductCreators.getProductListRequest({ perPage: 99999 }));
    dispatch(StoreCreators.getStoreListRequest({ perPage: 1000 }));

    if (jwtIdentity.group_id !== 1 && jwtIdentity.group_id !== 2) {
      // eslint-disable-next-line no-param-reassign
      initialValues.store.id = jwtIdentity.store_id;
    }
  };

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
          <Card style={{ padding: 20 }}>
            <InputContainer>
              <InputItem>
                <Field name="name" label="Nome" component={CustomTextField} />
              </InputItem>
              {(jwtIdentity.group_id === 1 || jwtIdentity.group_id === 2) && (
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
              )}
            </InputContainer>
            <InputContainer>
              <InputItem>
                <FastField
                  name="image"
                  label="Capa"
                  component={CustomImageField}
                  previewUrl={
                    values.image_info && values.image_info.small
                      ? values.image_info.small
                      : ''
                  }
                />
              </InputItem>
            </InputContainer>
            <InputContainer style={{ marginTop: 30, marginBottom: -20 }}>
              <InputItem style={{ width: '50%' }}>
                <Field
                  name="categories"
                  label="Categorias"
                  options={categoryList}
                  component={CustomSelect}
                  placeholder="Categorias"
                  isMulti
                  isLoading={categoryListLoading}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem style={{ width: '50%' }}>
                <Field
                  name="products"
                  label="Produtos"
                  options={productList}
                  component={CustomSelect}
                  placeholder="Produtos"
                  isMulti
                  isLoading={productListLoading}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <Field
                  name="products_preview"
                  component={VirtualCatalogPreview}
                  items={productList}
                  isLoading={productListLoading}
                />
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

VirtualCatalogForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  isLoading: PropTypes.bool.isRequired,
};

VirtualCatalogForm.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBack: false,
  onSubmit: () => {},
};

export default VirtualCatalogForm;
